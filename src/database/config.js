const mongoose = require("mongoose");


const dbConnection = async ()=>{

    try {
        await mongoose.connect('mongodb://192.168.210.100:27017/calendarBk')
        console.log('Db Online');
    } catch (error) {
        console.log(error);
        throw new Error ('Error a la hora de inicializar la bd')
    }
}

module.exports = {
    dbConnection
}