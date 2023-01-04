const { response } = require("express")
const jwt = require('jsonwebtoken')

const validarJwt = (req, res = response, next) => {

    //x-token headers

    const token = req.header('l-token');
    if(!token){
        return res.status(401).json({
            of:false,
            msg:'no hay token en la peticion'
        });
    }
    try {
        const {uid,name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = uid;
        req.name = name;
    } catch (error) {
        // console.log(error);
        return res.status(401).json({
            of:false,
            msg:'Token no valido'
        })
        
    }

    next();
}


module.exports = {
    validarJwt
}