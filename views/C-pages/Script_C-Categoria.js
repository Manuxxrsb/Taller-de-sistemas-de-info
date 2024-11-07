function agregarMedicamento() {

    const contenedor = document.getElementById("medicamentos");
    const nuevoMedicamento = document.createElement("div");
    nuevoMedicamento.innerHTML = `
        <input type="text" name="nombre" placeholder="Nombre del Medicamento" required>
        <input type="text" name="marca" placeholder="Marca" required>
        <input type="text" name="descripcion" placeholder="Descripción" required>
        <input type="text" name="numerolote" placeholder="Número de Lote" required>
        <input type="date" name="fechafabric" placeholder="Fecha de Fabricación" required>
        <input type="date" name="fechavence" placeholder="Fecha de Vencimiento" required>
        <input type="number" name="stock" placeholder="Stock" required>
        <h3>Bioequivalente</h3>
        <select id="editBioequivalente">
            <option value="true">Sí</option>
            <option value="false">No</option>
        </select>
        <input type="number" name="Precio" placeholder="Precio" required>
        <button type="button" onclick="eliminarMedicamento(this)">Eliminar</button>
    `;
    contenedor.appendChild(nuevoMedicamento);
}

function eliminarMedicamento(boton) {
    const contenedor = boton.parentNode;
    contenedor.parentNode.removeChild(contenedor);
}

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
        const bioequivalente = medicamento.querySelector('select[id="editBioequivalente"]').value;
        const precio = medicamento.querySelector('input[name="Precio"]').value;

        categoria.medicamentos.push({ nombre, marca, descripcion, numerolote, fechafabric, fechavence, stock, bioequivalente, precio });
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