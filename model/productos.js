import ProductosModelMem from "./productos-mem.js";
import ProductosModelFile from "./productos-file.js";
import ProductosModelMongoDB from "./productos-mongodb.js";

class ProductoModel {
    static get(tipo) {

        switch(tipo) {

            case 'MEM' :
                console.log('Presistenecia en MEMORIA (productos)')
                return new ProductosModelMem()

            case 'FILE' :
                console.log('Presistenecia en FILE (productos)')
                return new ProductosModelFile()
                
            case 'MONGODB' :
                console.log('Presistenecia en MONGODB (productos)')
                return new ProductosModelMongoDB()
                
            default :
                console.log('Presistenecia en DEFAULT(MEM) (productos)')
                return new ProductosModelMem()

        }
    }
}

export default ProductoModel