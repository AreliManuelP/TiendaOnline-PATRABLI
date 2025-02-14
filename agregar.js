// Función para agregar un producto al almacenamiento local
function agregarProducto(nombreProducto) {
    // Obtiene los productos actuales del almacenamiento local
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    // Agrega el nuevo producto
    productos.push(nombreProducto);
    
    // Guarda la lista actualizada en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));
    
    // Actualiza el contador de productos agregados
    actualizarContador();
    
    // Muestra el mensaje de confirmación
    mostrarMensaje(`Se agregó el producto: ${nombreProducto}`);
}

// Función para mostrar un mensaje temporal de confirmación en la página
function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById("mensajeConfirmacion");
    
    // Si el elemento no existe, lo crea
    if (!mensajeDiv) {
        const nuevoMensajeDiv = document.createElement("div");
        nuevoMensajeDiv.id = "mensajeConfirmacion";
        nuevoMensajeDiv.style.position = "fixed";
        nuevoMensajeDiv.style.top = "20px";
        nuevoMensajeDiv.style.right = "20px";
        nuevoMensajeDiv.style.backgroundColor = "#d4edda";
        nuevoMensajeDiv.style.color = "#155724";
        nuevoMensajeDiv.style.padding = "10px";
        nuevoMensajeDiv.style.borderRadius = "5px";
        document.body.appendChild(nuevoMensajeDiv);
        nuevoMensajeDiv.textContent = mensaje;

        // El mensaje desaparece después de 3 segundos
        setTimeout(() => {
            nuevoMensajeDiv.remove();
        }, 3000);
    } else {
        mensajeDiv.textContent = mensaje;
    }
}

// Actualiza el contador de productos en la interfaz
function actualizarContador() {
    const contador = document.getElementById("contadorProductos");
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    if (contador) contador.textContent = productos.length;
}

// Evento de "Agregar" que se enlaza al botón
document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const nombreProducto = e.target.dataset.nombre; // Asegúrate de tener un data-atributo "nombre" en el botón
        agregarProducto(nombreProducto);
    });
});

// Inicializar la funcionalidad cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
});
