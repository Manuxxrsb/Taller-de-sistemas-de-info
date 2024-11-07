const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(data);
    const url = 'http://localhost:8080/usuario'
    // Enviar la solicitud al backend (ejemplo con Fetch)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            notification.textContent = data;
            notification.style.display = 'block';
            notification.classList.toggle('error', isError);

        })
        .catch(error => {
            console.error('Error:', error);
        });
});