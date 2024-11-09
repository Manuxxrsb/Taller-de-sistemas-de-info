const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const usuario = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        contrasena: document.getElementById('contrasena').value
    };

    // Enviar la solicitud al backend (ejemplo con Fetch)
    fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            alert('Usuario agregado correctamente');

        })
        .catch(error => {
            alert('Error: '+ error);
        });
});