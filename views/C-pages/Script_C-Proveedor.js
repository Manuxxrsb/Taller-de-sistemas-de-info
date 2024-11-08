function enviarFormulario() {

    const proveedor = {
        nombre: document.getElementById("editNombre").value,
        telefono: document.getElementById("editTelefono").value,
        email: document.getElementById("editMail").value,
    };

    // Enviar datos al backend

    fetch('http://localhost:8080/proveedor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(proveedor),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            alert('Proveedor agregado correctamente');
        })
        .catch((error) => {
            alert('Error', error);
        });
}