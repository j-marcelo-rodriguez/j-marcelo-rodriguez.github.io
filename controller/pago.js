
// SDK de Mercado Pago
import mercadopago from "mercadopago"

// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-6387106121358503-021701-dcd6ff966c93888b59d78b55a131cb3f-7136338",
});

console.log('CONFIGURACION SDK MP OK!!!')


const feedBack = (req, res) =>  {
	let info = {
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	}

    res.redirect('/')
}

export default {
    feedBack
}