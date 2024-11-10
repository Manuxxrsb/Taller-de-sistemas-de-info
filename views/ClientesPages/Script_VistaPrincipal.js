
const boleta = {
    Usuario : "",
    email: "",
    Medicamentos:[]
};

document.addEventListener('DOMContentLoaded', (event) => {
    ObtenerMedicamentos();
    let galleta = document.cookie.split(",");
    nombreUsuario(galleta[1],galleta[2]);
});


function Adquirir(ID){
    fetch(`http://localhost:8080/medicamento/${ID}`)
    .then(data => data.json())
    .then(data => {
        let medicamento = data;
        let valor = prompt(`Ingrese la cantidad que llevaras (stock actual: ${medicamento.stock}) ` );
        if(valor > medicamento.stock){
            alert(`Por favor ingresa un valor Valido menor o igual que ${medicamento.stock}`);
            Adquirir(ID);
        }
        medicamento.stock = valor;
        boleta.Medicamentos.push(medicamento);
    })
    .catch(error => console.log(error));  
    console.log("Boleta actualizada");
    console.log(boleta);
}

function nombreUsuario(nombre,email){
    boleta.Usuario = nombre;
    boleta.email = email;
    let p = document.querySelector("div.saludo");
    if (p !== null) {
        p.innerHTML = `<h1 class="title-home">Bienvenido, ${nombre}</h1>`;
    } else {
        console.error("Elemento 'div.saludo' no encontrado");
    }
}

function ObtenerMedicamentos(){
// Obtener los medicamentos de la base de datos
fetch('http://localhost:8080/medicamentos')
.then(response => response.json())
.then(data => {
    const medicamentosContainer = document.getElementById('medicamentos');
    const row = document.createElement('div');
    row.classList.add('row');
    medicamentosContainer.appendChild(row);
    data.forEach(medicamento => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-3');
        card.innerHTML = `
            <img class="card-img-top" src="/views/ClientesPages/img/medicamento.png" alt="${medicamento.nombre}">
            <div class="card-body">
                <h5 class="card-title">${medicamento.nombre}</h5>
                <h6 class="card-text">${medicamento.marca}</h6>
                <p>${medicamento.descripcion}</p>
                <button href="#" class="btn btn-primary" onclick="Adquirir(${medicamento.ID})">Adquirir</button>
            </div>
        `;
        row.appendChild(card);
    });
})
.catch(error => console.error(error));
}

function Carrito(){
    let infoBoleta = `Usuario: ${boleta.Usuario}\nEmail: ${boleta.email}\nMedicamentos: `;
    boleta.Medicamentos.forEach(medicamento => {
        infoBoleta += `\n- ${medicamento.nombre} (Cantidad: ${medicamento.stock})`;
    });
    alert(infoBoleta);
}

function Imprimir(){
    let infoBoleta = `Usuario: ${boleta.Usuario}\nEmail: ${boleta.email}\nMedicamentos: `;
    boleta.Medicamentos.forEach(medicamento => {
        infoBoleta += `\n- ${medicamento.nombre} (Cantidad: ${medicamento.stock})`;
    });
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text( `${infoBoleta}` , 25 ,25);
    doc.save("documento.pdf");
}
