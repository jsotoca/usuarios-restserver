const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let rolesValidos = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol válido'
}

const usuarioSchema = new Schema({
    nombres:{type:String,required:[true,'Nombres son requeridos'],minlength:3,maxlength:50},
    ap_paterno:{type:String,required:[true,'Apellido Paterno Requerido'],minlength:3,maxlength:30},
    ap_materno:{type:String,required:[true,'Apellido Materno Requerido'],minlength:3,maxlength:30},
    email:{type:String,required:[true,'Email es Requerido'],unique:[true,'Email ya registrado'],match:[/.+\@.+\..+/, 'Por favor ingrese un correo válido']},
    password:{type:String,required:[true,'Contraseña es requerida']},
    celular:{type:String,required:[true,'celular de contácto es requerido'],match:[/9[0-9]{8}/,'ingrese un celular valido']},
    estado:{type:Boolean,default:true},
    role:{type:String,default:'USER_ROLE',enum:rolesValidos},
    google:{type:Boolean,default:false},
},{timestamps:true});

usuarioSchema.plugin(uniqueValidator,'{PATH} no es válido');

usuarioSchema.methods.toJSON = function(){
    let usuario = this;
    let usuarioObject = usuario.toObject();
    delete usuarioObject.password;
    return usuarioObject;
}

module.exports = mongoose.model('usuario',usuarioSchema);