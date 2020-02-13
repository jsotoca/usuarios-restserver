// SERVIDOR
process.env.PORT = process.env.PORT || 3000;

// BASE DE DATOS
let estado = process.env.NODE_ENV || 'dev';
(estado==='dev')?process.env.MONGO_URI='mongodb://localhost:27017/buscapatas':process.env.MONGO_URI=process.env.MONGO_URI;