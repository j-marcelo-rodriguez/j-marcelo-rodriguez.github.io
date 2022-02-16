import mongoose from "mongoose"

import config from "../config.js"


class DB_Mongo {
    static conexionOk = false

    static genIdKey(objeto) {
        if(Array.isArray(objeto)) {
            for(let i = 0; i < objeto.length; i++){
                objeto[i].id = objeto[i]._id

            }
        }
        else {
            objeto.id = objeto._id
        }

        return objeto
    }

    static async conectarDB() {
        try {

            if(!DB_Mongo.conexionOk) {
                await mongoose.connect(config.STR_CNX, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                console.log('Base de datos Online!')

                DB_Mongo.conexionOk = true
            }  
        }      
        catch(error) {
            console.log(`MongoDB no conectó: ${error.message}`)

        }
            
    }
}

export default DB_Mongo