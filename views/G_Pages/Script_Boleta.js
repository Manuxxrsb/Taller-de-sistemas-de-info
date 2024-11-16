document.addEventListener('DOMContentLoaded', (event) => {
    GetInformacion();
});

//----------------- VARIABLES DE ENTORNO --------------------------------
let boletasList;
let medicamentosList;

function GetInformacion() {
    fetch('http://localhost:8080/boletas')
        .then(response => response.json())
        .then(data => {
            boletasList = Object.values(data);
            GetMedicamentos();
        })
        .catch(error => console.error(error));
}

function GetMedicamentos() {
    fetch('http://localhost:8080/medicamentos')
        .then(response => response.json())
        .then(data => {
            medicamentosList = Object.values(data);
            displayBoletas(boletasList);
        })
        .catch(error => console.error(error));
}

function displayBoletas(listaBoletas) {
    let p = document.querySelector('#boletas-table tbody');
    let texto = '';
    for (let i = 0; i < listaBoletas.length; i++) {
        texto += `<tr class="Item-Boleta">
                    <td>${listaBoletas[i].id_usuario}</td>
                    <td>${listaBoletas[i].id_medicamento}</td>
                    <td>${listaBoletas[i].cantidad}</td>
                    <td>
                        <button onclick="verDetalles(${listaBoletas[i].ID})">Ver Detalles</button>
                    </td>
                </tr>`;
    }
    p.innerHTML = texto;
}

function verDetalles(boletaId) {
    const boleta = boletasList.find(b => b.ID === boletaId);
    if (boleta) {
        const medicamentosIds = boleta.id_medicamento.replace(/[\[\]\s]/g, '').split(',').map(Number);
        let medicamentosInfo = document.getElementById('medicamentos-info');
        let contenido = '<h3>Detalles de la Boleta</h3>';
        
        Promise.all(medicamentosIds.map(id =>
            fetch(`http://localhost:8080/medicamento/${id}`)
                .then(response => response.json())
        )).then(medicamentos => {
            medicamentos.forEach(medicamento => {
                contenido += `
                    <div class="medicamento-detalle">
                        <p><strong>Nombre:</strong> ${medicamento.nombre}</p>
                        <p><strong>Marca:</strong> ${medicamento.marca}</p>
                        <p><strong>Precio:</strong> $${medicamento.precio}</p>
                        <p><strong>Cantidad:</strong> ${boleta.cantidad}</p>
                    </div>
                    <hr>
                `;
            });
            medicamentosInfo.innerHTML = contenido;
            medicamentosInfo.style.display = 'block';
            
            // Hacer scroll suave hasta los detalles
            medicamentosInfo.scrollIntoView({ behavior: 'smooth' });
        }).catch(error => console.error(error));
    }
}
