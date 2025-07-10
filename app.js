import express from "express";
import dotenv from "dotenv";

const app = express()

app.listen(process.env.PORT, ()=>
    console.log("hola soy el server y estoy prendido Bv")
)