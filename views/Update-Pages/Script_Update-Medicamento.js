document.getElementById('medicamento').addEventListener('change', function () {
    const idMedicamento = this.value;
    if (idMedicamento) { // Verifica que idMedicamento no sea vacío
        fetch(`http://localhost:8080/medicamentos`)
            .then(response => response.json())
            .then(data => {
                const informacion = document.getElementById('informacion');
                informacion.innerHTML = `
            <h2>Información del medicamento</h2>
            <p>Nombre: ${data.nombre}</p>
            <p>Descripción: ${data.descripcion}</p>
            <p>Precio: ${data.precio}</p>
        `;
            })
            .catch(error => console.error('Error:', error));
    }
});

document.getElementById('categoria').addEventListener('change', function () {
    const idCategoria = this.value;
    if (idCategoria) { // Verifica que idCategoria no sea vacío
        fetch(`http://localhost:8080/categorias/${idCategoria}`)
            .then(response => response.json())
            .then(data => {
                const informacion = document.getElementById('informacion');
                informacion.innerHTML = `
            <h2>Información de la categoría</h2>
            <p>Nombre: ${data.nombre}</p>
            <p>Descripción: ${data.descripcion}</p>
        `;
            })
            .catch(error => console.error('Error:', error));
    }
});