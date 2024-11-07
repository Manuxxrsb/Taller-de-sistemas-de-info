const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(data);

    // Enviar la solicitud al backend (ejemplo con Fetch)
    fetch('http://localhost:8080/medica', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

