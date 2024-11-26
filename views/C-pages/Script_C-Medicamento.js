document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarProveedores();
});

function cargarCategorias() {
    fetch('http://localhost:8080/categorias')
        .then(response => response.json())
        .then(data => {
            const categoriaSelect = document.getElementById('categoria');
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.ID;
                option.textContent = categoria.nombre;
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar las categorías:', error);
        });
}

function cargarProveedores() {
    fetch('http://localhost:8080/proveedores')
        .then(response => response.json())
        .then(data => {
            const proveedorSelect = document.getElementById('Proveedor');
            data.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.ID;
                option.textContent = proveedor.nombre;
                proveedorSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los proveedores:', error);
        });
}

const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Datos del formulario:', data);

    // Crear objeto medicamento
    const medicamento = {
        nombre: data.Nombre,
        marca: data.Marca,
        descripcion: data.Descripcion,
        numerolote: data.numerolote,
        fechafabric: data.fechafabric,
        fechavence: data.fechavence,
        bioequivalente: data.Bioequivalente,
        precio: data.Precio,
        stock: data.stock,
        categoria: parseInt(data.categoria), // Asegúrate de que sea un número
        proveedor_id: parseInt(data.ProveedorID) // Asegúrate de que sea un número
    };

    // Convertir el objeto a JSON
    const jsonData = JSON.stringify(medicamento);

    console.log('Datos a enviar:', jsonData);

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
            alert('Medicamento registrado correctamente');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al registrar el medicamento');
        });
});

