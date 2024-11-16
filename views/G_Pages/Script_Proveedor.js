document.addEventListener('DOMContentLoaded', (event) => {
    GetProveedores();
});

let ProveedoresList;

function GetProveedores(){
    fetch('http://localhost:8080/proveedores')
    .then(response => response.json())
    .then(data => {
        ProveedoresList = Object.values(data);
        Proveedores();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function Proveedores(){
    let p = document.querySelector('tbody.Item-Proveedor');
    let texto='';
    for(let i=0;i < ProveedoresList.length; i++){
        texto += `<tr>
            <td>${ProveedoresList[i].ID}</td>
            <td>${ProveedoresList[i].rut}</td>
            <td>${ProveedoresList[i].nombre}</td>
            <td>${ProveedoresList[i].telefono}</td>
            <td>${ProveedoresList[i].email}</td>
            <td>${ProveedoresList[i].direccion}</td>
                <td>
                <button onclick="editarProveedor(${ProveedoresList[i].ID})"> Editar </button>
                </td>
        </tr>
        `;
    }

    p.innerHTML = texto;
}

function editarProveedor(id){
    console.log(id);
    let proveedor = ProveedoresList.find(proveedor => proveedor.ID === id);
    document.getElementById('editId').value = proveedor.ID
    if(proveedor){
        document.getElementById('editRut').value = proveedor.rut;
        document.getElementById('editNombre').value = proveedor.nombre;
        document.getElementById('editTelefono').value = proveedor.telefono;
        document.getElementById('editCorreo').value = proveedor.email;
        document.getElementById('editDireccion').value = proveedor.direccion;
        document.getElementById('editModal').style.display = 'block';
    }
}

function Actualizar(){
    const id = document.getElementById('editId').value;
    console.log("id a ctualizar");
    console.log(id);

    const ProveedorActualizado = {
        rut: document.getElementById('editRut').value,
        nombre: document.getElementById('editNombre').value,
        telefono: document.getElementById('editTelefono').value,
        email: document.getElementById('editCorreo').value,
        direccion: document.getElementById('editDireccion').value,
    };

    console.log(ProveedorActualizado);

    fetch(`http://localhost:8080/proveedor/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ProveedorActualizado),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la actualización: ${response.status} ${response.statusText}`);
        }
        response.json();
    })
    .then(data => {
        console.log('Proveedor actualizado con éxito:', data);
        // Aquí puedes cerrar el modal o actualizar la lista de proveedores si es necesario
        document.getElementById('editModal').style.display = 'none';
        GetProveedores(); // Para refrescar la lista de proveedores
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No se pudo actualizar el proveedor. Verifica los datos e intenta nuevamente.');
    });
}