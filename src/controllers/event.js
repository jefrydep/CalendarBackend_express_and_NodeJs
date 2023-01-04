const { response } = require("express");
const Evento = require("../models/Evento");




const getEvents = async (req,res=response)=>{
    const eventos = await Evento.find()
    .populate('user','name')
  
        res.json({
            ok:true,
            eventos,
        })

        
    
}

const createEvent= async(req,res = response)=>{
    //verificamos si tenemos el evento
    // console.log(req.body);
 
    const evento = new Evento(req.body);
    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

       res.json({
        ok:true,
        evento:eventoGuardado
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            of:false,
            msg:'Hable con el administrador'
        })
        
    }
}
const updateEvents= async(req,res= response)=>{
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"No tienes privilegio de estira este evento"
            })

        }
        const nuevoEvento ={
            ...req.body,
            user:uid,
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});
        res.json({
            ok:true,
            evento:eventoActualizado,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            of:false,
            msg:'Hable con el administrador'
        })
        
    }
  


}

const removeEvent = async (req,res = response)=>{
    const eventoId = req.params.id;
    const uid=req.uid;
    try {

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
   
}
module.exports={
    createEvent,
    getEvents,
    removeEvent,
    updateEvents
}