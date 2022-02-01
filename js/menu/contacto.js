let datosContacto = null

let inputsContacto = null
let formContacto = null
let buttonContacto = null

const contactCustomValidity = function (mensaje, index) {
    const errorDivs = document.querySelectorAll('.form-contact__error-validity')
    errorDivs[index].innerHTML = mensaje
    errorDivs[index].style.display = mensaje ? 'block' : 'none'

    
}



function validarContacto(valor, index) {


    if (index === 0) {
        let validadorNombre = /^[a-z ,.'-]{5,40}$/i
        if (!validadorNombre.test(valor)) {
            contactCustomValidity('Demasiados caracteres', 0)
            return null
        }
        contactCustomValidity('', 0)
        return valor
    }

    if (index === 1) {
        let validadorMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        if (!validadorMail.test(valor)) {
            contactCustomValidity('Mail no válido', 1)
            return null
        }
        contactCustomValidity('', 1)
        return valor
    }


    if (index === 2) {
        let validadorDetalles = /^[\s\S]{0,300}$/
        if (!validadorDetalles.test(valor)) {
            contactCustomValidity('Ingrese de 0 a 400 caracteres', 2)
            return null
        }
        contactCustomValidity('', 2)
        return valor
    }

    
}




function initContacto() {
    console.warn('initContacto')

    datosContacto = []

    inputsContacto = document.querySelectorAll('.form-contact input, textarea')
    formContacto = document.querySelector('.form-contact')
    buttonContacto = document.querySelector('.form-contact__submit')

    inputsContacto.forEach((inputContacto, index) => {
    
        inputContacto.addEventListener('input', () => {
            validarContacto(inputContacto.value, index)
            
        })
    })

    formContacto.addEventListener('submit', e => {
        e.preventDefault()
    
        let datoContacto = {
            nombre: inputsContacto[0].value,
            mail: inputsContacto[1].value,
            comentario: inputsContacto[2].value,
        }
    
        datosContacto.push(datoContacto)
        console.log(datosContacto)
    
    
        inputsContacto.forEach((inputContacto) => {
            inputContacto.value = ''
        })
    })




}