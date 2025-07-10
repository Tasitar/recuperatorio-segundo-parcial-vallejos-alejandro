import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";

dotenv.config();

const app = express()

app.listen(process.env.PORT, ()=>
    console.log("hola soy el server y estoy prendido Bv")
)

const connectDB = async () =>{
    try{
        await sequelize.authenticate();
        console.log('hola soy la base de datos y estoy conectada ;D')

        await sequelize.sync({alter: true});
    }
}
