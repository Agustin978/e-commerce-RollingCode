let listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || [];
let contenedorCarrito = document.getElementById("contenedorCarrito");
let total = 0;
readCarrito();
subTotalCarrito();

function readCarrito(){
    listaCarrito.forEach(producto => {
        contenedorCarrito.innerHTML +=`
        <tr>
        <td class="align-middle">
            <img
            src="${producto.imagen}"
            class="img-fluid rounded float-start w-75 mx-auto"
            alt="${producto.nombre}"
          />
        </td>
        <td class="align-middle">
          <p class="text-secondary text-truncate">
            ${producto.detalle}
          </p>
        </td>
        <td class="align-middle">
          <p class="precio-poducto fs-5">$${producto.precio}</p>
        </td>
        <td class="align-middle">
          <button
          class="bi bi-x-lg boton-Eliminar-Administrador btn"
          onclick="eliminarProductoCarrito('${producto.codigo}')"
          ></button>
        </td>
      </tr>
        `
        total = total + parseInt(producto.precio);
    });
}

function subTotalCarrito(){
        contenedorCarrito.innerHTML +=`
        <tr>
            <td colspan="3" class="text-end fs-4">
                Total:
                <p class="badge precio-poducto fs-4">$${total}</p>
            </td>
        </tr>
        `
}

function eliminarProductoCarrito(codigo){
    Swal.fire({
        title: 'Estas seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6246ea',
        cancelButtonColor: '#e45858',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let posicionProducto = listaCarrito.findIndex(prod => prod.codigo === codigo);
            listaCarrito.splice(posicionProducto, 1);
            localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));
            let productosCarrito = document.getElementById('contenedorCarrito');
            productosCarrito.removeChild(productosCarrito.children[posicionProducto]);
            Swal.fire(
                'Listo!',
                'Producto eliminado.',
                'success'
            )
        }
    })
};