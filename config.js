import dotenv from "dotenv"

dotenv.config({
    path: 'miconfig.env'
})

export default {
    PORT: process.env.PORT || 8080,
    TIPO_DE_PERSISTENCIA: process.env.TIPO_P || 'MONGODB', //'MEM'  // 'FILE'  // 'MONGODB'
    STR_CNX: process.env.CNX || 'mongodb+srv://j-marcelo-rodriguez:LearN2022@clusterecommerce.uecyv.mongodb.net/ecommerce?retryWrites=true&w=majority'
}