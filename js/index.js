const URL = "js/dibujos.json"
const carrito =  JSON.parse(localStorage.getItem("dibujosPedidos")) || []
const dibujos = []
const contenedorIndex = document.querySelector("div.contenedor-index#contenedorIndex")
const botonCarritoDibujos = document.querySelector("img.boton-carrito")

function crearCardDibujos(dibujo) {
    return `<div class="tarjetas-index">
                <img class="imagen" src="${dibujo.imagen}">
                <div class="nombre">${dibujo.nombre}</div>
                <div class="precio">$ ${dibujo.precio}</div>
                <button id="${dibujo.id}" class="seleccionar">Seleccionar</button>
            </div>`
}

function cargarDibujos() {
    dibujos.forEach((dibujo)=> {
        contenedorIndex.innerHTML += crearCardDibujos(dibujo)
        agregarAlCarrito()
    })
}

function obtenerDibujos() {
    fetch(URL)
    .then((response)=> response.json())
    .then((data)=> dibujos.push(...data))
    .then(()=> cargarDibujos())
}
obtenerDibujos()

function agregarAlCarrito() {
    const botonesAgregar = document.querySelectorAll("button.seleccionar")
    botonesAgregar.forEach((boton)=> {
        boton.addEventListener("click", (e)=> {
            const id = parseInt(e.target.id)
            const dibujoSeleccionado = dibujos.find((dibujo)=> dibujo.id === id)
            carrito.push(dibujoSeleccionado)
            localStorage.setItem("dibujosPedidos", JSON.stringify(carrito))
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "El dibujo se agregó al carrito!",
                showConfirmButton: false,
                timer: 1300
            })
        })
    })
}

botonCarritoDibujos.addEventListener("click", ()=> {
    if (carrito.length > 0) {
        location.href = "confirm.html"
    }
})
