class CarritoController {

    constructor() {
        try {
            carritoModel.inicializar(JSON.parse(localStorage.getItem('carrito')) || [] )
        }
        catch {
            carritoModel.inicializar([])
            localStorage.setItem('carrito', carritoModel.obtener())
        }
    }

    agregarAlCarrito(producto) {

        if(!carritoModel.productoExiste(producto)){

            producto.cantidad = 1
            carritoModel.guardar(producto)

        } else {
            let productoDeCarrito = carritoModel.obtenerProducto(producto)
            productoDeCarrito.cantidad++

        }

        localStorage.setItem('carrito', JSON.stringify(carritoModel.obtener()))
    }

    async borrarProducto(id) {
        console.log('borrarProducto', id)

        carritoModel.borrar(id)
        localStorage.setItem('carrito', JSON.stringify(carritoModel.obtener()))

        await renderCarrito(carritoModel.obtener())
    }

    async enviarCarrito() {
        console.log('enviando carrito')

        let elemSectionCarrito = document.querySelector('.section-carrito')
        elemSectionCarrito.innerHTML = '<h2>Enviando carrito....</h2>'
        let preference = await carritoService.guardarCarrito(carritoModel.obtener())
        console.log('ok!')
        elemSectionCarrito.innerHTML = '<h2>Enviando carrito....<b>Ok!</b></h2>'

        carritoModel.inicializar([])
        localStorage.setItem('carrito', carritoModel.obtener())

        setTimeout( async () => {
            elemSectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false

            await renderPago(preference)

        }, 0)
    }

}

const carritoController = new CarritoController()