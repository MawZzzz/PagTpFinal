
function agregarCarrito(nombre, precio, idCantidad){

    let cantidad = document.getElementById(idCantidad).value;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");
}

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