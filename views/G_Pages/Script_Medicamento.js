//actual area de trabajo
document.addEventListener('DOMContentLoaded', obtenerCategorias);
function obtenerCategorias() {
    fetch('http://localhost:8080/categorias')
        .then(response => response.json())
        .then(data => {
            const categoriasList = Object.values(data);
            const categoriasNombreValor = categoriasList.map(categoria => ({ nombre: categoria.nombre, valor: categoria.id }));
            categorias = categoriasNombreValor; // Guardar la lista de categorías en la variable categorias

            // Agregar opciones a la lista de categorías en el formulario de edición
            const selectCategoria = document.getElementById('editCategoria');
            selectCategoria.innerHTML = ''; // Limpiar las opciones existentes
            categoriasNombreValor.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.valor;
                option.text = categoria.nombre;
                selectCategoria.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}




//-------------------------------------------------

function prueba() {
    // Llamar a la API para obtener la lista de medicamentos
    fetch('http://localhost:8080/medicamentos')
        .then(response => response.json()) // Acceder a los datos de la API como JSON
        .then(data => {
            medicamentosList = Object.values(data); // Guardar la lista de medicamentos en medicamentosList
            displayMedicamentos(medicamentosList); // Funcioin Mostrar medicamentos
        })
        .catch(error => console.error(error));
}

function displayMedicamentos(lista) {
    const p = document.querySelector('tbody.Item-Medicamento');
    let texto = ''; // Información que entrega el JSON
    for (let i = 0; i < lista.length; i++) {
        texto += `<tr>
                        <td>${lista[i].Id}</td>
                        <td>${lista[i].nombre}</td>
                        <td>${lista[i].marca}</td>
                        <td>${lista[i].descripcion}</td>
                        <td>${lista[i].numerolote}</td>
                        <td>${lista[i].fechafabric}</td>
                        <td>${lista[i].fechavence}</td>
                        <td>${lista[i].stock}</td>
                        <td>${lista[i].CategoriaID}</td>
                        <td>${lista[i].bioequivalente}</td> 
                        <td>${lista[i].precio}</td>	
                        <td>
                            <button onclick="eliminarMedicamento(${lista[i].Id})">Eliminar</button>
                            <button onclick="editarMedicamento(${lista[i].Id})">Editar</button>
                        </td>
                       </tr>`;
    }
    p.innerHTML = texto;
}

function filterMedicamentos() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase(); // Convertir a minúsculas para comparación
    const filteredMedicamentos = medicamentosList.filter(medicamento => {
        return (
            medicamento.nombre.toLowerCase().includes(filter) ||
            medicamento.marca.toLowerCase().includes(filter) ||
            medicamento.descripcion.toLowerCase().includes(filter) ||
            medicamento.numerolote.toLowerCase().includes(filter) ||
            medicamento.fechafabric.toLowerCase().includes(filter) ||
            medicamento.fechavence.toLowerCase().includes(filter) ||
            medicamento.stock.toString().includes(filter) ||
            medicamento.CategoriaID.toString().includes(filter) ||
            medicamento.bioequivalente.toString().includes(filter) ||
            medicamento.precio.toString().includes(filter)

        );
    });
    displayMedicamentos(filteredMedicamentos); // Mostrar los medicamentos filtrados
}

function eliminarMedicamento(id) { //hacer que en vez de eliminar se pitee el stock pero mantenga la informacion
    fetch(`http://localhost:8080/medicamentos/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Medicamento eliminado con éxito.');
                prueba(); // Volver a cargar la lista de medicamentos
            } else {
                alert('Error al eliminar el medicamento.');
            }
        })
        .catch(error => console.error('Error:', error));
}



function editarMedicamento(id) {
    const medicamento = medicamentosList.find(m => m.Id === id);
    if (medicamento) {
        document.getElementById('editId').value = medicamento.Id;
        document.getElementById('editNombre').value = medicamento.nombre;
        document.getElementById('editMarca').value = medicamento.marca;
        document.getElementById('editDescripcion').value = medicamento.descripcion;
        document.getElementById('editNumerolote').value = medicamento.numerolote;
        document.getElementById('editFechafabric').value = medicamento.fechafabric;
        document.getElementById('editFechavence').value = medicamento.fechavence;
        document.getElementById('editStock').value = medicamento.stock;
        document.getElementById('editPrecio').value = medicamento.precio;
        document.getElementById('editCategoria').value = medicamento.categoria_id; // Asegúrate de que esto funcione
        document.getElementById('editModal').style.display = 'block';
    }
}

function cerrarModal() {
    document.getElementById('editModal').style.display = 'none';
}

document.getElementById('editForm').addEventListener('submit', actualizarMedicamento);

function actualizarMedicamento(event) {
    event.preventDefault();
    const id = document.getElementById('editId').value;
    const medicamentoActualizado = {
        nombre: document.getElementById('editNombre').value,
        marca: document.getElementById('editMarca').value,
        descripcion: document.getElementById('editDescripcion').value,
        numerolote: document.getElementById('editNumerolote').value,
        fechafabric: document.getElementById('editFechafabric').value,
        fechavence: document.getElementById('editFechavence').value,
        stock: document.getElementById('editStock').value,
        bioequivalente: document.getElementById('editBioequivalente').value,
        categoria: document.getElementById('editCategoria').value,
        precio: document.getElementById('editPrecio').value,
    };

    console.log('Medicamento a actualizar:', medicamentoActualizado); // Agregar este log

    fetch(`http://localhost:8080/medicamentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicamentoActualizado)
    })
        .then(response => {
            if (response.ok) {
                alert('Medicamento actualizado con éxito.');
                cerrarModal();
                prueba(); // Recargar la lista de medicamentos
            } else {
                alert('Error al actualizar el medicamento.');
            }
        })
        .catch(error => console.error('Error:', error));
}
