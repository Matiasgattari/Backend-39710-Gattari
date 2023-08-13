//crear un registro de usuario. debo crear la SESION del mismo para cuando este logeado. para esto utilizo express-session

import MongoStore from 'connect-mongo'
import session from 'express-session'
import { MONGODB_PATH } from '../config/config.mongo.js'
import { SESSION_SECRET } from '../config/session.config.js'

export default session({
  store: MongoStore.create({ mongoUrl: MONGODB_PATH }),
  saveUninitialized: false, //solo se guarda la sesion si tiene datos dentro.
  resave: false, //para librerias muy puntuales que lo pidan. siempre false
  secret: SESSION_SECRET
})

