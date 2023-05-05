//extraer el codigo del producto del url
const codigoProd = new URLSearchParams(window.location.search);
//buscar producto
let listaProductos = JSON.parse(localStorage.getItem('listaProductos')) || [];
let listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || [];
const producto = listaProductos.find(prod => prod.codigo === codigoProd.get('codigo'));
//mostrar los datos del producto
const detalle = document.getElementById('contenedorDetalle');
let contadorCarrito = document.getElementById("contadorCarrito");

readDetalle();
contadorCarritoAct();
function readDetalle(){
    detalle.innerHTML = `        
    <aside class="col-md-6">
        <img
            src="${producto.imagen}"
            alt="${producto.categoria}, ${producto.nombre}"
            class="w-100"
        />
    </aside>
    <aside class="col-md-6">
        <h1>${producto.categoria} - ${producto.nombre}</h1>
        <hr />
        <p>
            ${producto.detalle}
        </p>
        <div class="my-3">
            <span class="precio-poducto">$${producto.precio}</span>
        </div>
        <button class="boton text-light my-3"onClick="agregarCarrito('${producto.codigo}')" id="btnAgregarCarrito">Agregar al carrito</button>
        <span class="stock">Stock: ${producto.stock}</span>
    </aside> 
    `
}

function agregarCarrito(codigo){
    //confirma que haya productos en el stock y recien carga el prod al carrito
    if(controlStock(codigo)){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Listo <i class="bi bi-cart"></i>',
            showConfirmButton: false,
            timer: 1500
          })
        listaCarrito.push(producto);
        agregarProductoCarritoLocalStorage();
        contadorCarritoAct();
    }
}
function agregarProductoCarritoLocalStorage(){
    localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));
}

function controlStock(codigo){
    const btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
    //se consigue la posicion del producto en la lista de los productos en el localstorage
    let posicionProducto = listaProductos.findIndex(producto => producto.codigo === codigo)
    let productoStock = parseInt(listaProductos[posicionProducto].stock);
    //se verifica si el producto esta agotado
    if(parseInt(listaProductos[posicionProducto].stock) === 0){
        btnAgregarCarrito.className = "boton text-light my-3 btn-deshabilitado"
        return false;
    }else{
        //se resta en uno el stock
        listaProductos[posicionProducto].stock = productoStock - 1;
        //se guarda el nuevo valor en el local storage
        localStorage.setItem("listaProductos", JSON.stringify(listaProductos));  
        readDetalle(); 
        return true;
    }
}
//modifica el span en el maquetado con la cantidad de productos cargados en el carrito
function contadorCarritoAct(){
    contadorCarrito.innerText = listaCarrito.length;
  }