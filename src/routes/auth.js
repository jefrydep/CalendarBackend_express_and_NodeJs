const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidarToken } = require('../controllers/auth');
const { validateField } = require('../middelwares/validar-campos');
const { validarJwt } = require('../middelwares/validar-jwt');

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').isLength({ min: 5 }),
    validateField
], createUser)

router.post('/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe tener minimo 5 caracteres').isLength({ min: 5 }),
    validateField

], loginUser)


router.get('/renew', validarJwt,revalidarToken)



module.exports = router;

