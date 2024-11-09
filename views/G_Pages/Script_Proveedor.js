document.addEventListener('DOMContentLoaded', (event) => {
    GetProveedores();
    console.log("Proveedores obtenidos")
    //Proveedores();
});


let ProveedoresList;

function GetProveedores(){
    fetch('http://localhost:8080/proveedores')
    .then(response => response.json())
    .then(data => {
        ProveedoresList = Object.values(data);
        console.log(data);
        Proveedores();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function Proveedores(){
    //GetProveedores(ProveedoresList)
    console.log("ProveedoresList ");
    console.log(ProveedoresList)
    let p = document.querySelector('tbody.Item-Proveedor');
    let texto='';
    for(let i=0;i < ProveedoresList.length; i++){
        texto += `<tr>
            <td>${ProveedoresList[i].ID}</td>
            <td>${ProveedoresList[i].nombre}</td>
            <td>${ProveedoresList[i].telefono}</td>
            <td>${ProveedoresList[i].email}</td>
                <td>
                <button onclick="editarProveedor(${ProveedoresList[i].ID})"> Editar </button>
                </td>
        </tr>
        `;
    }

    p.innerHTML = texto;
}


