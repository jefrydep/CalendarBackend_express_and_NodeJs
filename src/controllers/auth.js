const { response } = require('express')
 
const Usuario = require('../models/Usuario');
 
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        let user = await Usuario.findOne({ email });
        // console.log(`user:${user}`);
        if (user) {
            return res.status(400).json({
                of: false,
                msg: 'existe un usuario con ese correo'
            })
        }

        user = new Usuario(req.body);
        //incriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();
        //generar json we token

        const token = await generarJWT(user.id, user.name);
        res.status(201).json({
            ok: true,
            // msg:'registro'
            uid: user.id,
            name: user.name,
            token,

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            of: false,
            msg: "por favor hable con el administrador"
        })

    }
    // const { name, email, password } = req.body

}


const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await Usuario.findOne({ email });
        console.log(`user:${user}`);
        if (!user) {
            return res.status(400).json({
                of: false,
                msg: 'no existe usuario con ese email'
            })
        }
        //confirmar los passwords

        const validPasword = bcrypt.compareSync(password, user.password);
        if (!validPasword) {
            return res.status(400).json({
                of: false,
                msg: "password incorrecto"
            });
        }
        //generar nuestro token,

        const token = await generarJWT(user.id, user.name);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            of: false,
            msg: "por favor hable con el administrador"
        })

    }
    // res.json(
    //     {

    //         ok: true,
    //         msg: 'login',
    //         email,
    //         password,

    //     }
    // )


}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;
    //generrar token
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token
    })



}






module.exports = {
    createUser,
    loginUser,
    revalidarToken,
}