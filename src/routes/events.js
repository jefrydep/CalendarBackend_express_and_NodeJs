const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvents, removeEvent } = require("../controllers/event");
const { isDate } = require("../helpers/idDate");
const { validateField } = require("../middelwares/validar-campos");
const { validarJwt } = require("../middelwares/validar-jwt");

const router = Router()



router.use(validarJwt);
router.get('/',getEvents);

router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','fecha de inicio es obligatoria').custom(isDate),
    check('end','fecha finalizacion es obligatoria').custom(isDate),
    check('notes','notes   es obligatoria').not().isEmpty(),
    validateField,
],createEvent);


router.put('/:id',updateEvents);


router.delete('/:id',removeEvent)


{}
module.exports = router;