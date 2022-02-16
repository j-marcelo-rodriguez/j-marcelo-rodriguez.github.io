import CarritoModelMongoDB from "./carrito-mongodb.js";

class CarritoModel {
    static get(tipo) {

        switch(tipo) {

            case 'MONGODB' :
                console.log('Presistenecia en MONGODB (carrito)')
                return new CarritoModelMongoDB()
            default :
                console.log('Presistenecia en MONGODB (carrito)')
                return new CarritoModelMongoDB()

        }
    }
}

export default CarritoModel