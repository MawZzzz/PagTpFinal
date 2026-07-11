/* 
    Manejo de stock sin PHP: se guarda en localStorage.
    Para cambiar el stock inicial de un producto, editá los valores acá abajo.
    IMPORTANTE: el nombre tiene que ser EXACTAMENTE igual al que usás en 
    agregarCarrito('Nombre', precio, idCantidad) en el HTML.
*/

const productosStock = {
    "Busto Naruto": 5,
    "Figura Goku": 10
};

// Inicializar el stock en localStorage la primera vez (si ya existe, no lo pisa)
if (!localStorage.getItem("stock")) {
    localStorage.setItem("stock", JSON.stringify(productosStock));
}

function obtenerStock(nombre) {
    let stock = JSON.parse(localStorage.getItem("stock")) || {};
    return stock[nombre] ?? 0;
}

function reducirStock(nombre, cantidad) {
    let stock = JSON.parse(localStorage.getItem("stock")) || {};
    if (stock[nombre] !== undefined) {
        stock[nombre] = Math.max(0, stock[nombre] - cantidad);
        localStorage.setItem("stock", JSON.stringify(stock));
    }
}

function aumentarStock(nombre, cantidad) {
    let stock = JSON.parse(localStorage.getItem("stock")) || {};
    if (stock[nombre] !== undefined) {
        stock[nombre] += cantidad;
        localStorage.setItem("stock", JSON.stringify(stock));
    }
}

// Busca todos los elementos con data-stock-producto="Nombre del producto"
// y les pone el stock actual como texto. Ver ejemplo de uso en el HTML.
function mostrarStock() {
    document.querySelectorAll("[data-stock-producto]").forEach(el => {
        let nombre = el.getAttribute("data-stock-producto");
        el.innerText = obtenerStock(nombre);
    });
}

document.addEventListener("DOMContentLoaded", mostrarStock);

// Por si querés resetear el stock a los valores originales desde la consola
function resetearStock() {
    localStorage.setItem("stock", JSON.stringify(productosStock));
    mostrarStock();
}
