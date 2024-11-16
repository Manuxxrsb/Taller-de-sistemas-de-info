document.addEventListener('DOMContentLoaded', (event) => {
    prueba();
});

function prueba() {
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json()) // accessing the API data as JSON
        .then(data => {
            const lista = Object.values(data);
            const p = document.querySelector('tbody.Item-Usuarios');
            var texto = [];
            for (let i = 0; i < lista.length; i++) {
                texto = texto + (`<tr><td>${lista[i].ID}</td>
                        <td>${lista[i].nombre}</td>
                        <td>${lista[i].apellido}</td>
                        <td>
                            <button onclick="eliminar(${lista[i].ID})">Eliminar</button>
                        </td>
                        </tr>
                        `);
            }
            p.innerHTML = texto;
        })
        .catch(error => console.error(error));
}

//----------- BOTONES -------------------

function eliminar(id) {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
        const url = `http://localhost:8080/usuario/${id}`
        fetch(url, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Usuario eliminado con éxito');
                prueba();
            })
            .catch(error => {
                console.error(error);
                alert('Error al eliminar el usuario');
            });
    }
}