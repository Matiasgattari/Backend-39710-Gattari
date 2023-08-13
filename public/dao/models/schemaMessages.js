import mongoose, { Schema } from 'mongoose';

const schemaMensajes = new Schema({
    timestamp: { type: Number },
    autor: { type: String },
    mensaje: { type: String},
    // _id:{ type: String}
}, { versionKey: false })


export const mensajesDB = mongoose.model('messages', schemaMensajes)

