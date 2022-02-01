

let inputs = null
let form = null
let button = null

const camposValidos = [ false, false, false, false, false, false, false, false ]
const algunCampoNoValido = () => {
    let valido = 
    camposValidos[0] &&
    camposValidos[1] &&
    camposValidos[2] &&
    camposValidos[3] &&
    camposValidos[4] &&
    camposValidos[5] &&
    camposValidos[6] &&
    camposValidos[7] 

    return !valido
}

const setCustomValidity = function (mensaje, index) {
    const errorDivs = document.querySelectorAll('.form-container__error-validity')
    errorDivs[index].innerHTML = mensaje
    errorDivs[index].style.display = mensaje ? 'block' : 'none'

    
}



function validar(valor, index) {


    if (index === 0) {
        let validadorNombre = /^[\s\S]{0,30}$/
        if (!validadorNombre.test(valor)) {
            setCustomValidity('Ingrese un nombre de producto válido', 0)
            camposValidos[0] = false
            button.disabled = true
            return null
        }

        camposValidos[0] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 0)
        return valor
    }

    if (index === 1) {
        let validadorPrecio = /^\d+(,\d{3})*(\.\d{1,2})?$/
        if (!validadorPrecio.test(valor)) {
            setCustomValidity('Precio no válido', 1)
            camposValidos[1] = false
            button.disabled = true
            return null
        }

        camposValidos[1] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 1)
        return valor
    }

    if (index === 2) {
        let validadorStock = /^[1-9][0-9]{1,2}$|^\d$/
        if (!validadorStock.test(valor)) {
            setCustomValidity('Stock no válido', 2)
            camposValidos[2] = false
            button.disabled = true
            return null
        }

        camposValidos[2] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 2)
        return valor

    }

    if (index === 3) {
        let validadorMarca = /^[\s\S]{0,25}$/
        if (!validadorMarca.test(valor)) {
            setCustomValidity('Ingrese una marca válida', 3)
            camposValidos[3] = false
            button.disabled = true
            return null
        }

        camposValidos[3] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 3)
        return valor
    }

    if (index === 4) {
        
        if (inputs[4].value == '') {
            setCustomValidity('Selecciona una opción', 4)
            camposValidos[4] = false
            button.disabled = true
            return null
        }

        camposValidos[4] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 4)
        return valor
    }

    if (index === 5) {
        let validadorGarantia = /^(6|12|24)$/
        if (!validadorGarantia.test(valor)) {
            setCustomValidity('Ingresa 6, 12 o 24 meses', 5)
            camposValidos[5] = false
            button.disabled = true
            return null
        }

        camposValidos[5] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 5)
        return valor
    }

    if (index === 6) {
        let validadorImagen = /(\.jpg|\.jpeg|\.png|\.gif)$/i
        if (!validadorImagen.test(valor)) {
            setCustomValidity('Imagen no válida', 6)
            camposValidos[6] = false
            button.disabled = true
            return null
        }

        camposValidos[6] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 6)
        return valor
    }

    if (index === 7) {
        let validadorDetalles = /^[\s\S]{0,400}$/
        if (!validadorDetalles.test(valor)) {
            setCustomValidity('Ingresa de 0 a 400 caracteres', 7)
            camposValidos[7] = false
            button.disabled = true
            return null
        }

        camposValidos[7] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 7)
        return valor
    }

    
}



function renderProds(productos) {

    fetch('vistas/alta.hbs')
    .then(r => r.text())
    .then(plantilla => {

        var template = Handlebars.compile(plantilla);
        let html = template({ productos: productos });
    
        document.querySelector('.fieldset-container__listado-productos').innerHTML = html

    })

}


function leerProductoIngresado() {
    return {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        categoria: inputs[4].value, 
        garantia: inputs[5].value,
        foto: inputs[6].value,
        detalle: inputs[7].value,
        envio: inputs[8].checked,

    }
}

function limpiarFormulario() {

    inputs.forEach((input) => {
        input.type == 'checkbox'? input.checked = false : input.value = ''
    })

    button.disabled = true

    for(let i = 0; i < camposValidos.length; i++){
        camposValidos[i] = false
    }

}

async function initAlta() {
    console.warn('initAlta')

    inputs = document.querySelectorAll('.form-container input, select, textarea')
    // console.log(inputs)
    form = document.querySelector('.form-container')
    button = document.querySelector('.form-container__submit')

    button.disabled = true

    productosModel.inicializar(await productosController.obtenerProductos())
    renderProds(productosModel.obtener())

    inputs.forEach((input, index) => {
        if(input.type != 'checkbox') {
            input.addEventListener('input', () => {
                validar(input.value, index)
                // console.log(input.value)
            })
        }
    })

    form.addEventListener('submit', async e => {
        e.preventDefault()
    
        let producto = leerProductoIngresado()
        limpiarFormulario()

        await productosController.guardarProducto(producto)


    })


}