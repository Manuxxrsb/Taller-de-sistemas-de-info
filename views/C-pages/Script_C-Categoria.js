document.addEventListener('DOMContentLoaded', (event) => {
    GetProveedores();
});

let ProveedoresList

function GetProveedores() {

    fetch('http://localhost:8080/proveedores')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            ProveedoresList = Object.values(data);
        })
        .catch(error => console.error(error));
}

function agregaopcionesProveedor(Proveedor, selectElement) {
    let opciones = '';
    for (let i = 0; i < Proveedor.length; i++) {
        opciones += `<option value="${Proveedor[i].ID}">${Proveedor[i].nombre}</option>`;
    }
    selectElement.innerHTML = opciones;
}

//------- BOTONES ----------//

function agregarMedicamento() {
    const contenedor = document.getElementById("medicamentos");
    const medicamentoId = Date.now(); // Crear ID único
    const nuevoMedicamento = document.createElement("div");
    nuevoMedicamento.className = "medicamento-item";
    nuevoMedicamento.innerHTML = `
        <div class="input-group">
            <input type="text" name="nombre" placeholder="Nombre del Medicamento" required>
            <input type="text" name="marca" placeholder="Marca" required>
        </div>
        <div class="input-group">
            <input type="text" name="descripcion" placeholder="Descripción" required>
            <input type="text" name="numerolote" placeholder="Número de Lote" required>
        </div>
        <div class="input-group">
            <input type="date" name="fechafabric" placeholder="Fecha de Fabricación" required>
            <input type="date" name="fechavence" placeholder="Fecha de Vencimiento" required>
        </div>
        <div class="input-group">
            <input type="number" name="stock" placeholder="Stock" required>
            <input type="number" name="Precio" placeholder="Precio" required>
        </div>
        <div class="select-group">
            <div class="select-container">
                <label for="editBioequivalente_${medicamentoId}">Bioequivalente</label>
                <select id="editBioequivalente_${medicamentoId}">
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="select-container">
                <label for="editProveedor_${medicamentoId}">Proveedor</label>
                <select id="editProveedor_${medicamentoId}"></select>
            </div>
        </div>
        <button type="button" class="btn-delete" onclick="eliminarMedicamento(this)">Eliminar</button>
    `;
    contenedor.appendChild(nuevoMedicamento);
    
    // Agregar opciones de proveedor al nuevo select
    const proveedorSelect = nuevoMedicamento.querySelector(`#editProveedor_${medicamentoId}`);
    agregaopcionesProveedor(ProveedoresList, proveedorSelect);
}

function eliminarMedicamento(boton) {
    const contenedor = boton.parentNode;
    contenedor.parentNode.removeChild(contenedor);
}

//------------------------------------------

function enviarFormulario(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const categoria = {
        nombre: formData.get("nombre_categoria"),
        descripcion: formData.get("descripcion_categoria"),
        medicamentos: []
    };

    // Recopilar medicamentos
    const medicamentos = document.querySelectorAll("#medicamentos > div");
    medicamentos.forEach(medicamento => {
        const nombre = medicamento.querySelector('input[name="nombre"]').value;
        const marca = medicamento.querySelector('input[name="marca"]').value;
        const descripcion = medicamento.querySelector('input[name="descripcion"]').value;
        const numerolote = medicamento.querySelector('input[name="numerolote"]').value;
        const fechafabric = medicamento.querySelector('input[name="fechafabric"]').value;
        const fechavence = medicamento.querySelector('input[name="fechavence"]').value;
        const stock = medicamento.querySelector('input[name="stock"]').value;
        const bioequivalente = medicamento.querySelector('select[id^="editBioequivalente_"]').value;
        const proveedorID = parseInt(medicamento.querySelector('select[id^="editProveedor_"]').value);
        const precio = medicamento.querySelector('input[name="Precio"]').value;

        categoria.medicamentos.push({ nombre, marca, descripcion, numerolote, fechafabric, fechavence, stock, bioequivalente, proveedorID, precio });
    });

    // Enviar datos al backend

    fetch('http://localhost:8080/categoria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoria),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            alert('Categoría y medicamentos agregados correctamente');
        })
        .catch((error) => {
            alert('Error', error);
        });
}