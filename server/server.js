require('./config/config');
const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('hola mundo');
});

app.use(require('./routes/usuario'));

mongoose.connect(process.env.MONGO_URI,{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) throw new Error(err);
    console.log(`Base de datos levantada en modo ${(!process.env.NODE_ENV)?'Desarrollo':'Produccion'}`);
    app.listen(process.env.PORT,()=>{
        console.log(`Servidor levantado en el puerto ${process.env.PORT}`);
    });
});