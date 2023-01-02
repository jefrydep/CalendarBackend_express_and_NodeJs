const { response, request } = require('express')
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
 


const createUser = async(req, res = response) => {
    // const { name, email, password } = req.body

    const user = new Usuario(req.body);
    await user.save();
    res.status(201).json({
        ok:true,
        msg:'registro'
        
    })
}


const loginUser = (req, res = response) => {
    const { email, password } = req.body;
    res.json(
        {

            ok: true,
            msg: 'login',
            email,
            password

        }
    )


}

const revalidarToken = (req, res = response) => {




}






module.exports = {
    createUser,
    loginUser,
    revalidarToken,
}