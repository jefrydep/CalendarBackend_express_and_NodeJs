const { response, request } = require('express')
const { validationResult } = require('express-validator')


const createUser = (req, res = response) => {
    const { name, email, password } = req.body


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            of:false,
            errors:errors.mapped()
        })
    }

    res.status(201).json({
        name,
        email,
        password

    })
}


const loginUser = (req, res = response) => {
    const {email,password}=req.body;
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