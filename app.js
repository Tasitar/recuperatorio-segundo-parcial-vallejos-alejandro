import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import "./src/models/language.model.js"
import lenguageRoutes from "./src/routes/language.routes.js";

dotenv.config();

const app = express()

app.use(express.json());

app.use("/api/language", lenguageRoutes)

app.listen(process.env.PORT, ()=>
    console.log("hola soy el server y estoy prendido Bv")
)

const connectDB = async () =>{
    try{
        await sequelize.authenticate();
        console.log('hola soy la base de datos y estoy conectada ;D')

        await sequelize.sync({alter: true});
        console.log("modelos sincronizados con la BD :p")
    }
    catch (error){
        console.error('Error al conectarse o sincronizar con la BD >:V')
    }
}

connectDB()