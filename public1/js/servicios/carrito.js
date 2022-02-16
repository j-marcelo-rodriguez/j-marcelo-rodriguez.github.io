class CarritoService {
    URL_CARRITO = '/api/carrito/'

    async guardarCarrito(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado

    }

}

const carritoService = new CarritoService()