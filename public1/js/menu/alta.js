let inputs = null
let form = null
let button = null

let dropArea = null
let progressBar = null
let URLImagenSubida = ''

const camposValidos = [ false, false, false, false, false, false, false ]
const algunCampoNoValido = () => {
    let valido = 
    camposValidos[0] &&
    camposValidos[1] &&
    camposValidos[2] &&
    camposValidos[3] &&
    camposValidos[4] &&
    camposValidos[5] &&
    camposValidos[6] 

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

/*     if (index === 6) {
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
    } */

    if (index === 6) {
        let validadorDetalles = /^[\s\S]{0,400}$/
        if (!validadorDetalles.test(valor)) {
            setCustomValidity('Ingresa de 0 a 400 caracteres', 6)
            camposValidos[6] = false
            button.disabled = true
            return null
        }

        camposValidos[6] = true
        button.disabled = algunCampoNoValido()
        setCustomValidity('', 6)
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
        foto: URLImagenSubida,
        detalle: inputs[6].value,
        envio: inputs[7].checked,

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

    let img = document.querySelector('.form-container__gallery img')
    img.src = ''

    inicializarProgress()
    URLImagenSubida = ''

}

function inicializarProgress() {

    progressBar.value = 0 
}
function actualizarProgress(porcentaje) {

    progressBar.value = porcentaje 
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.querySelector('.form-container__gallery img')
        img.src = reader.result
    }
}

function handleFiles(files) {
    let file = files[0]
    inicializarProgress()
    previewFile(file)
    uploadFile(file)
}

function uploadFile(file) {
    var url = '/upload'

    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)

    xhr.upload.addEventListener('progress', e => {
        let porcentaje = (e.loaded * 100) / e.total
        actualizarProgress(porcentaje)
    })

    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            let nombreImagenSubida = JSON.parse(xhr.response).nombre
            URLImagenSubida = nombreImagenSubida? ('/uploads/' + nombreImagenSubida) : ''
        }
    })

    var formData = new FormData()
    formData.append('foto', file)

    xhr.send(formData)
}

async function initAlta() {
    console.warn('initAlta')

    inputs = document.querySelectorAll('.form-container input:not(input[id=foto]), select, textarea')
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

    /* ------------- DRAG & DROP --------------- */
    dropArea = document.getElementById('form-container__picture')
    progressBar = document.getElementById('progress-bar')

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, e => e.preventDefault())
        document.body.addEventListener(eventName, e => e.preventDefault())
    })

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('highlight')
        })

    })

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('highlight')
        })
    })

    dropArea.addEventListener('drop', e => {
        var dt = e.dataTransfer
        var files = dt.files
        handleFiles(files)
    })
}
