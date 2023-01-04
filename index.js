
const express =require('express');
const { dbConnection } = require('./src/database/config');
//crear el servidor de express

const app = express();


//importamos dotenv
require('dotenv').config();
const cors = require('cors')


// console.log(process.env);


//Rutas


// app.get('/',(req,res)=>{
//     res.send({
//         messages:'heloworld'
//     })
// })


//lectura y parseo del body
app.use(express.json());


//base de datos

dbConnection();

app.use(cors())
//Directorio Publico

app.use(express.static('public'))

app.use('/api/auth',require('./src/routes/auth'));
app.use('/api/events',require('./src/routes/events'))

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el pueto ${process.env.PORT}`);
})


//comandos


//npm init -y
//npm i nodemon -g
//npm i express
//npm i dotenv
//npm i express-validator