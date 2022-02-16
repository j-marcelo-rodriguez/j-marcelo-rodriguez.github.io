class ProductosController {

    async obtenerProductos() {

        let productos = await productosService.obtenerProductos() 
        return productos
    }

    async guardarProducto(producto) {
        let productoGuardado = await productosService.guardarProducto(producto)

        productosModel.guardar(productoGuardado)

        renderProds(productosModel.obtener())

        return productoGuardado

    }

    async actualizarProducto(id) {
        console.log('actualizarProducto', id)

        let producto = leerProductoIngresado()
        limpiarFormulario()

        let productoActualizado = await productosService.actualizarProducto(id, producto)

        productosModel.actualizar(id, productoActualizado)

        renderProds(productosModel.obtener())

        return productoActualizado
    }

    async borrarProducto(id) {
        console.log('borrarProducto', id)
        let productoBorrado = await productosService.borrarProducto(id)

        productosModel.borrar(id)

        renderProds(productosModel.obtener())

        return productoBorrado
    }

}

const productosController = new ProductosController()