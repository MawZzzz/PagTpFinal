/*mostrar carrito*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let tabla = document.getElementById("tablaCarrito");
let total = 0;

carrito.forEach(producto => {
    let subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${subtotal}</td>
        </tr>
    `;
});

document.getElementById("totalFinal").innerText = "Total: $" + total;

function finalizarCompra(){
    alert("Pedido realizado con éxito");
    localStorage.removeItem("carrito");
    location.reload();
}