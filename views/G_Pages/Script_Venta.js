document.addEventListener('DOMContentLoaded', (event) => {
    ObtenerMedicamentos();
});

function ObtenerMedicamentos() {
    fetch('http://localhost:8080/medicamentos')
        .then(response => response.json())
        .then(data => {
            const selects = document.querySelectorAll('.medicamento');
            selects.forEach(select => {
                data.forEach(medicamento => {
                    if (medicamento.stock > 0) {
                        const option = document.createElement('option');
                        option.value = medicamento.ID;
                        option.text = `${medicamento.nombre} - Stock: ${medicamento.stock}`;
                        select.appendChild(option);
                    }
                });
            });
        })
        .catch(error => {
            console.error(error);
            alert('Error al obtener los medicamentos.');
        });
}

function AgregarProducto() {
    const productosContainer = document.getElementById('productosContainer');
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('producto');
    nuevoProducto.innerHTML = `
        <label for="medicamento">Medicamento:</label>
        <select class="medicamento" name="medicamento"></select>
        <label for="cantidad">Cantidad:</label>
        <input type="number" class="cantidad" name="cantidad" min="1" required>
    `;
    productosContainer.appendChild(nuevoProducto);
    ObtenerMedicamentos();
}

function Vender() {
    const productos = document.querySelectorAll('.producto');
    const ventas = {
        id_usuario: "1", // Asumiendo que el ID del usuario es 1, puedes cambiarlo según sea necesario
        id_medicamento: [],
        cantidad: []
    };

    productos.forEach(producto => {
        const medicamentoID = producto.querySelector('.medicamento').value;
        const cantidad = parseInt(producto.querySelector('.cantidad').value);

        fetch(`http://localhost:8080/medicamento/${medicamentoID}`)
            .then(response => response.json())
            .then(medicamento => {
                if (cantidad > medicamento.stock) {
                    alert(`Cantidad no disponible para ${medicamento.nombre}. Stock actual: ${medicamento.stock}`);
                } else {
                    medicamento.stock -= cantidad;
                    ventas.id_medicamento.push(medicamento.ID);
                    ventas.cantidad.push(cantidad);

                    const boleta = {
                        id_usuario: ventas.id_usuario,
                        id_medicamento: JSON.stringify(ventas.id_medicamento),
                        cantidad: JSON.stringify(ventas.cantidad)
                    };

                    fetch('http://localhost:8080/boleta', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(boleta)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Venta realizada correctamente', data);
                        alert('Venta realizada correctamente.');
                        // Actualizar el stock en la base de datos
                        const medicamentoActualizado = {
                            ...medicamento,
                            stock: medicamento.stock.toString()
                        };
                        
                        fetch(`http://localhost:8080/medicamentos/${medicamentoActualizado.ID}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(medicamentoActualizado)
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Stock actualizado', data);
                            alert('Stock actualizado correctamente.');
                            // Actualizar el formulario
                            ObtenerMedicamentos();
                        })
                        .catch(error => {
                            console.error('Error al actualizar el stock:', error);
                            alert('Error al actualizar el stock.');
                        });
                    })
                    .catch(error => {
                        console.error('Error al realizar la venta:', error);
                        alert('Error al realizar la venta.');
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener el medicamento:', error);
                alert('Error al obtener el medicamento.');
            });
    });
}
