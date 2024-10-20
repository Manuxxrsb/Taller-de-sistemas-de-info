// script.js

// Capturamos el evento de submit del formulario
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los valores de email y password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulación de autenticación
    if (email === 'admin@gmail.com' && password === 'admin') {
        alert('Inicio de sesión exitoso');
        // Redirigir a otra página, por ejemplo, index.html
        window.location.href = 'index.html';
    } else if (email != '' && password != '') {
        alert('Bienvenido');
        // Redirigir a otra página, por ejemplo, index.html
        window.location.href = 'ClientesPages/VistaPrincipal.html';
    } else {
        alert('Credenciales inválidas');
    }
});