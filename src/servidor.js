//EXPRESS Y SOCKET.IO
import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'

//VARIABLES DE ENTORNO
import entorno from './config/entorno.js';

//ROUTERS
import { productsRouter } from './routes/productsRouter.js';
import { cartsRouter } from './routes/cartsRouter.js';
import { ticketsRouter } from './routes/ticketsRouter.js';
import { sessionsRouter } from './routes/sessionsRouter.js';

//CFG
import { PORT } from './config/config.sv.js';

//inicializando mongoose en el sv
import {inicioMongoose} from './database/mongoose.js'

//SESSION
import session from './middlewares/session.js';

import { manejadorDeErrores } from './middlewares/manejoDeErroresRest.js';
import { sinLoguear, soloAdmin, soloLogueados, soloPremium } from './middlewares/soloLogueados.js';
import { chatController } from './controllers/web/chat.controller.js';

//PASSPORT
import {passportInitialize } from './middlewares/passport.js';
import { passportSession } from './middlewares/passport.js';

import { homeController } from './controllers/api/home.controller.js';
import { realTimeProductsController } from './controllers/api/realtimeproducts.controller.js';


import { loggerPeticion } from './middlewares/winstonLogger.js';
import { winstonLogger } from './utils/winstonLogger.js';
import { docsRouter } from './routes/docsRouter.js';
import { userRouter } from './routes/userRouter.js';
import { testsRouter } from './routes/testsRouter.js';

const app = express()

app.engine('handlebars', engine())
app.set('views', './views') //ruta donde estaran las vistas del handlebars
app.set('view engine', 'handlebars') // que el motor por defecto para manejar las viastas sea handlebars

app.use(session)

app.use(passportInitialize, passportSession) // acá cargo passport en el servidor express como middleware

app.use(express.static('./public')) //permite el uso de los archivos dentro de la carpeta public
app.use(express.static('./static')) //permite el uso de los archivos dentro de la carpeta static

app.use(express.json()) //para poder recibir archivos json desde express

app.use(loggerPeticion)

app.use('/api/products',soloLogueados, productsRouter)
app.use('/api/carts',soloLogueados, cartsRouter)
app.use('api/tickets',soloLogueados, ticketsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', userRouter)
app.use('/api/test', testsRouter)
//DOCUMENTACION
app.use('/api/docs', docsRouter)


const httpServer = app.listen(PORT)
winstonLogger.info(`Servidor escuchando en puerto ${PORT}`)
export const io = new SocketIOServer(httpServer)


app.get('/', async (req, res) => {

    res.render('index', {
        titulo: 'Inicio',
        encabezado: 'Bienvenido al servidor'
    })
//    res.json({"message":`bienvenido al servidor, ingrese a "/api/sessions/" para poder registrarse o iniciar sesion.`})
})

//PRODUCTOS
app.get('/realtimeproducts',soloLogueados,soloAdmin, realTimeProductsController)

app.get('/home',soloLogueados, homeController)



//CHAT
app.get('/chat', soloLogueados,chatController)



app.get('*', (req,res)=>{
    res.redirect('/')
})

//MANEJADOR DE ERRORES
app.use(manejadorDeErrores)


