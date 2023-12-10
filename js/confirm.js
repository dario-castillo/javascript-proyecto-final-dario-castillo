const carrito = JSON.parse(localStorage.getItem("dibujosPedidos")) || []

const contenedorConfirm = document.querySelector("div.contenedor-confirm#contenedorConfirm")

const botonSeguir = document.querySelector("button.boton-seguir")
const botonComprar = document.querySelector("button#botonComprar")
const totalDibujosPedidos = document.querySelector("#valorPedido")

function crearCardDibujosPedidos(dibujoSeleccionado) {
    return `<div class="tarjetas-seleccionadas">
                <img class="imagen" src="${dibujoSeleccionado.imagen}">
                <div class="nombre">${dibujoSeleccionado.nombre}</div>
                <div class="precio">$ ${dibujoSeleccionado.precio}</div>
            </div>`
}

function cargarDibujosPedidos() {
    carrito.forEach((dibujoSeleccionado)=> contenedorConfirm.innerHTML += crearCardDibujosPedidos(dibujoSeleccionado))
    calcularPedido()
    }

function calcularPedido() {
    let montoTotalCarrito = carrito.reduce((acc, producto)=> acc + producto.precio, 0)
    totalDibujosPedidos.textContent = montoTotalCarrito
}

cargarDibujosPedidos()

botonSeguir.addEventListener("click", ()=> {
    location.href = "index.html"
})

botonComprar.addEventListener("click", ()=> {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Muchísimas gracias por tu compra 😃!",
        showConfirmButton: false,
        timer: 3000
    })
    localStorage.removeItem("dibujosPedidos")
    setTimeout(()=> { 
        location.href = "index.html"
    }, 3500)
})
