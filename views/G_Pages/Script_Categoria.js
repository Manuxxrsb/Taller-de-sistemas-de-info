document.addEventListener('DOMContentLoaded', (event) => {
    prueba();
    console.log("Proveedores categorias")
});



function prueba() {
    const url = 'http://localhost:8080/categorias' // countries api
    fetch(url)
        .then(response => response.json()) // accessing the API data as JSON
        .then(data => {
            const lista = Object.values(data)
            const p = document.querySelector('tbody.Item-Categoria')
            var texto = []
            for (let i = 0; i < lista.length; i++) {
                texto = texto + (`<tr>
                        <td>${lista[i].ID}</td>
                        <td>${lista[i].nombre}</td>
                        <td>${lista[i].descripcion}</td> 
                        </tr>
                    `)
            }
            p.innerHTML = texto
            mostrarMedicamentos(lista)
        })
        .catch(error => console.error(error))
}

function mostrarMedicamentos(lista) {
    lista.forEach(categoria => {
        const url = `http://localhost:8080/medbycategoria/${categoria.ID}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const medicamentosContainer = document.querySelector('.medicamentos-container')
                const medicamentosHtml = `
                    <h2 class="title-home" >Medicamentos de la categoría ${categoria.nombre}</h2>
                    <ul>
                        ${data.map(medicamento => `<li>${medicamento.nombre}</li>`).join('')}</ul>
                `
                medicamentosContainer.innerHTML += medicamentosHtml
            })
            .catch(error => console.error(error))
    })
}

// Agregar evento a los botones Ver Medicamentos
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.VerMedicamentos')
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const id_categoria = boton.getAttribute('data-id')
            const medicamentosContainer = document.querySelector('.medicamentos-container')
            const medicamentosHtml = `
                <h2>Medicamentos de la categoría ${id_categoria}</h2>
                <ul>
                    <!-- medicamentos -->
                </ul>
            `
            medicamentosContainer.innerHTML = medicamentosHtml
            const url = `http://localhost:8080/medbycategoria/${id_categoria}`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const medicamentosList = medicamentosContainer.querySelector('ul')
                    medicamentosList.innerHTML = data.map(medicamento => `<li>${medicamento.nombre}</li>`).join('')
                })
                .catch(error => console.error(error))
        })
    })
})
