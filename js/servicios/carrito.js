class CarritoService {
    URL_CARRITO = 'https://61e2157c3050a100176820c9.mockapi.io/carrito/'

    async guardarCarrito(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado

    }

}

const carritoService = new CarritoService()