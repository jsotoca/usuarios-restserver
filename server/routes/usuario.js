const express = require('express');
const app = express();

const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario',(req,res)=>{
    Usuario.find({}).exec((err,USERSDB)=>{
        if(err) return res.status(400).json({ok:false,err});
        Usuario.countDocuments((err,conteo)=>{
            if(err) return res.status(400).json({ok:false,err});
            return res.json({
                ok:true,
                usuarios:USERSDB,
                total:conteo
            });
        });
    });
});

app.post('/usuario',(req,res)=>{
    let body = req.body;
    
    let usuario = new Usuario({
        nombres:body.nombres,
        ap_paterno:body.ap_paterno,
        ap_materno:body.ap_materno,
        email:body.email,
        password: bcrypt.hashSync(body.password,10),
        celular:body.celular,
        role:body.role
    });

    usuario.save((err,USERDB)=>{
        if(err) return res.status(400).json({ok:false,err});
        res.json({
            ok:true,
            usuario:USERDB
        });
    });
});

app.put('/usuario/:id',(req,res)=>{
    const id = req.params.id;
    const body = _.pick(req.body,['nombres','ap_paterno','ap_materno','role','celular']);
    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true,context:'query'},(err,USERDB)=>{
        if(err) return res.status(400).json({ok:false,err});
        res.json({
            ok:true,
            usuario:USERDB
        });
    });
});

app.delete('/usuario/:id',(req,res)=>{
    const id = req.params.id;
    Usuario.findByIdAndUpdate(id,{estado:false},{new:true},(err,USERDB)=>{
        if(err) return res.status(400).json({ok:false,err});
        res.json({
            ok:true,
            usuario:USERDB
        });
    });
});

module.exports = app;