
function agregarCarrito(nombre, precio, idCantidad){


    let cantidad = parseInt(document.getElementById(idCantidad).value);

    //chequear que haya stock suficiente antes de agregar
    let stockDisponible= obtenerStock(nombre);
        console.log("Producto:", nombre);
        console.log("Cantidad:", cantidad);
        console.log("Stock:", stockDisponible);     
        if(cantidad > stockDisponible){
            alert("No hay stock suficiente de "+ nombre + ". Disponible"+ " " + stockDisponible);
            
            return;
        }


    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // buscar si el producto ya existe en el carrito(por nombre)
    let productoExistente = carrito.find(p=> p.nombre === nombre);

    if(productoExistente){
            //si ya existe,solo actualizo la cantidad (la sumo a la que ya estaba)
            productoExistente.cantidad = parseInt(productoExistente.cantidad)+cantidad;

    }else{
        //si no existe, recien ahi lo agrego como nuevo producto
    
    carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
    });
}

    localStorage.setItem("carrito", JSON.stringify(carrito));

    //descuento del stock disponible y actualizo lo que se ve en pantalla
    reducirStock(nombre, cantidad)
    mostrarStock();
    
}

/*mostrar carrito*/

let tabla = document.getElementById("tablaCarrito");



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let total = 0;

const imagenesProductos = {
    'Busto Naruto': "images/BustoNaruto.jpg",
    'Figura Goku': "images/FiguraGoku.jpg"
};

carrito.forEach((producto, index ) => {
    //no repetir el producto en la tabla, si ya existe, solo actualizar la cantidad y subtotal

    let subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    

    
    tabla.innerHTML  += `
        <tr>
            
    
            <td class="producto-carrito">
    <img src="${imagenesProductos[producto.nombre]}" alt="${producto.nombre}">
    <span>${producto.nombre}</span>
    </td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${subtotal}</td>
            <td><button onclick="eliminarProducto(${carrito.indexOf(producto)})">Eliminar</button></td>
        </tr>
    `;
    document.getElementById("totalFinal").innerText = "Total: $" + total ;

});





function finalizarCompra(){
    
    localStorage.removeItem("carrito");
    location.reload();
}

function vaciarCarrito() {
    //devolver el stock lo que habia en el carrito,ya que no se llego a comprar nada
    let carrito =JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.forEach(producto =>{
            aumentarStock(producto.nombre, parseInt(producto.cantidad));

    });


    localStorage.removeItem("carrito");
    location.reload();
}
function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto = carrito[index];

    if (producto) {

        // Devuelve SOLO una unidad al stock
        aumentarStock(producto.nombre, 1);

        // Resta una unidad del carrito
        producto.cantidad--;

        // Si ya no quedan unidades, elimina el producto
        if (producto.cantidad <= 0) {
            carrito.splice(index, 1);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
}

