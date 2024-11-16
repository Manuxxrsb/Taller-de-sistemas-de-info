function enviarFormulario() {
    event.preventDefault();

    const nuevoProveedor = {
        rut: document.getElementById('editRut').value,
        nombre: document.getElementById('editNombre').value,
        telefono: document.getElementById('editTelefono').value,
        email: document.getElementById('editMail').value,
        direccion: document.getElementById('editDireccion').value
    };

    console.log(nuevoProveedor); // Agregar un log para verificar los datos

    fetch('http://localhost:8080/proveedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProveedor)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        alert('Proveedor guardado exitosamente');
        // Limpiar el formulario
        document.getElementById('editRut').value = '';
        document.getElementById('editNombre').value = '';
        document.getElementById('editTelefono').value = '';
        document.getElementById('editMail').value = '';
        document.getElementById('editDireccion').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar el proveedor');
    });
}