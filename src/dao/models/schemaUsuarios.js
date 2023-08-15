// import mongoose from 'mongoose'

// const usuarioSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique:true},
//   password: { type: String, required: true },
//   first_name: { type: String, required: true },
//   last_name: { type: String, required: true },
//   age: { type: Number, required: true },
//   rol: {enum: ['Admin', 'User', 'Developer','Premium'], type: String},
//   cart: { type: String},
//   documents: { type: Array}
// }, { versionKey: false })

// export const usuarioModel = mongoose.model('usuarios', usuarioSchema)


import mongoose from 'mongoose'

// Definir el sub-schema para los documentos
const documentSchema = new mongoose.Schema({
  name: { type: String },
  reference: { type: String }
})

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  rol: {enum: ['Admin', 'User', 'Developer','Premium'], type: String},
  cart: { type: String},
  documents: [documentSchema], // Usar el sub-schema para los documentos
  last_connection: { type: String},
}, { versionKey: false })

export const usuarioModel = mongoose.model('usuarios', usuarioSchema)