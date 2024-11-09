
let UsuariosList

document.addEventListener('DOMContentLoaded', (event) => {
    GetUsuarios();
    console.log("usuarios obtenidos")
});

function GetUsuarios(){
    fetch('http://localhost:8080/usuarios')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        UsuariosList = Object.values(data);
    })
}

function Registrar(){
    window.open('/views/C-pages/C-Usuario.html','_blank')
}

function IsUser(email , password ,usuarios){
    
    for(let i = 0;i<usuarios.length ; i++){
        if(usuarios[i].email == email && usuarios[i].contrasena == password){
            return true;
        }
    }

    return false;

}

// Capturamos el evento de submit del formulario
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los valores de email y password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let pass = IsUser(email,password,UsuariosList);

    // Simulación de autenticación
    if (email === 'admin@gmail.com' && password === 'admin') {
        alert('Inicio de sesión exitoso');
        // Redirigir a otra página, por ejemplo, index.html
        window.location.href = 'index.html';
    } else if (pass == true) {
        let usuarioInfo = UsuariosList.find(usuario => usuario.email === email);
        alert(`Bienvenido ${usuarioInfo.nombre} ${usuarioInfo.apellido}`);
        // Llama a la función para eliminar todas las cookies
        if(document.cookie != null){
            eliminarCookies();
        }
        document.cookie = `${usuarioInfo.ID},${usuarioInfo.nombre},${email}; path=/views/ClientesPages/; max-age= ` + 60*60*2; // Cookie válida por 1 hora
        window.location.href = 'ClientesPages/VistaPrincipal.html';
        

        
    } else {
        alert('Credenciales inválidas');
    }
}); 


function eliminarCookies() {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        document.cookie = cookie[0] + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
}