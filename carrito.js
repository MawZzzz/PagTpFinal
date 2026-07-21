
function agregarCarrito(nombre, precio, idCantidad){


    let cantidad = parseInt(document.getElementById(idCantidad).value);

    //chequear que haya stock suficiente antes de agregar
    let stockDisponible= obtenerStock(nombre);
        console.log("Producto:", nombre);
        console.log("Cantidad:", cantidad);
        console.log("Stock:", stockDisponible);     
       if(cantidad > stockDisponible){

    mostrarNotificacion(
        "error",
        "Stock insuficiente",
        "Solo quedan " + stockDisponible + " unidades de " + nombre + "."
    );

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

    mostrarNotificacion(
    "success",
    "Producto agregado",
    nombre + " fue agregado al carrito."
);
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


function finalizarCompra(){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(carrito.length == 0){

        mostrarNotificacion(
            "warning",
            "Carrito vacío",
            "Agregá un producto antes de finalizar la compra."
        );

        return;
    }

    mostrarNotificacion(
        "success",
        "Compra realizada",
        "Gracias por elegir Proyecto 3D."
    );

    setTimeout(function(){

        localStorage.removeItem("carrito");
        location.reload();

    },2500);

}

function vaciarCarrito() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(carrito.length == 0){

        mostrarNotificacion(
            "warning",
            "Carrito vacío",
            "No hay productos para eliminar."
        );

        return;
    }

    carrito.forEach(producto => {
        aumentarStock(producto.nombre, parseInt(producto.cantidad));
    });

    mostrarNotificacion(
        "success",
        "Carrito vaciado",
        "Todos los productos fueron eliminados."
    );

    setTimeout(function(){

        localStorage.removeItem("carrito");
        location.reload();

    },2500);

}   


function mostrarNotificacion(tipo, titulo, mensaje){

    let notificacion = document.getElementById("notificacion");
    let icono = document.getElementById("iconoNotificacion");
    let tituloNotificacion = document.getElementById("tituloNotificacion");
    let texto = document.getElementById("textoNotificacion");

    notificacion.className = "notificacion";
    notificacion.classList.add(tipo);

    tituloNotificacion.innerText = titulo;
    texto.innerText = mensaje;

    if(tipo == "success"){

    if(titulo == "Carrito vaciado"){
        icono.innerHTML = "🗑";
    }else{
        icono.innerHTML = "✔";
    }

    icono.style.color = "#32a762";
}
    else if(tipo == "error"){
        icono.innerHTML = "✖";
        icono.style.color = "#D32F2F";
    }
    else{
        icono.innerHTML = "⚠";
        icono.style.color = "#ff9800";
    }

    notificacion.classList.add("mostrar");

    setTimeout(function(){

        notificacion.classList.remove("mostrar");

    },3000);
}

