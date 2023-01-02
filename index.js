
const express =require('express')
//crear el servidor de express

const app = express();


//importamos dotenv
require('dotenv').config();


// console.log(process.env);


//Rutas


// app.get('/',(req,res)=>{
//     res.send({
//         messages:'heloworld'
//     })
// })


//lectura y parseo del body
app.use(express.json());



//Directorio Publico

app.use(express.static('public'))

app.use('/api/auth',require('./src/routes/auth'));

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el pueto ${process.env.PORT}`);
})


//comandos


//npm init -y
//npm i nodemon -g
//npm i express
//npm i dotenv
//npm i express-validator