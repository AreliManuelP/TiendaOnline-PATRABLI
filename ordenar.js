const listaElement = document.getElementById('listaProductos');
const mensajeProductos = document.getElementById('mensajeProductos');
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Función para mostrar los productos
const mostrarProductos = () => {
    listaElement.innerHTML = '';
    mensajeProductos.textContent = `Productos añadidos: ${productos.length}`;

    if (productos.length === 0) {
        listaElement.innerHTML = '<li>No hay productos en la lista.</li>';
        return;
    }

    const productoContador = productos.reduce((acc, producto) => {
        acc[producto] = (acc[producto] || 0) + 1;
        return acc;
    }, {});

    // Crear la lista de productos con sus cantidades
    for (const [nombre, cantidad] of Object.entries(productoContador)) {
        const li = document.createElement('li');
        li.textContent = `${cantidad} ${nombre}`;
        
        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Eliminar';
        botonBorrar.onclick = () => {
            // Eliminar solo uno del producto
            const index = productos.indexOf(nombre);
            if (index > -1) {
                productos.splice(index, 1); // Eliminar una unidad
                localStorage.setItem('productos', JSON.stringify(productos));
                mostrarProductos(); // Actualizar visualmente
            }
        };

        li.appendChild(botonBorrar);
        listaElement.appendChild(li);
    }
};

// Función para enviar el correo
const enviarEmail = () => {
    if (productos.length === 0) return alert('No hay productos para enviar.');

    const mensaje = Object.entries(productos.reduce((acc, producto) => {
        acc[producto] = (acc[producto] || 0) + 1;
        return acc;
    }, {}))
    .map(([nombre, cantidad]) => `${cantidad} ${nombre}`)
    .join('\n');

    emailjs.send('service_6ykcuxh', 'template_vw49pev', { to_email: 'arelipruebas6@gmail.com', message: mensaje })
        .then(() => {
            alert('Orden enviada con éxito.');
            productos = [];
            localStorage.removeItem('productos');
            mostrarProductos();
        })
        .catch(error => alert('Error al enviar el correo: ' + JSON.stringify(error)));
};

// Configuración del evento de envío
document.getElementById('enviarEmail').onclick = enviarEmail;

// Configurar evento de regreso
document.getElementById('volver').onclick = () => {
    window.history.back(); // Regresar a la página anterior
};

// Inicialización
mostrarProductos();
