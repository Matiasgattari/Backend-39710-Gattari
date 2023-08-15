import mongoose from 'mongoose'

const ticketsSchema = new mongoose.Schema({
  date: { type: String},
  usuario: { type: String, required: true },
  // id: { type: String, required: true },
  monto: { type: Number, },//required:true
  cart: { type: String, required:true},
  code:{type:String,required:true}
}, { versionKey: false })

export const ticketsModel = mongoose.model('tickets', ticketsSchema)