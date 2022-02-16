import express  from 'express'
import controller from '../controller/carrito.js'

const router = express.Router()

/* ------------------------ RUTA POST -------------------------- */
router.post('/', controller.postCarrito)
/* ------------------------------------------------------------- */

export default router


