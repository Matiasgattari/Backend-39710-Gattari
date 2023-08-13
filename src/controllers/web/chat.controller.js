import {
    mensajesManager
} from "../../../public/dao/mensajesManager.js";
import {
    io
} from "../../servidor.js";

export function chatController(req, res,next) {
try {
    io.on('connection', async clientSocket => {

        // evento para nuevos mensajes
        clientSocket.on('nuevoMensaje', async mensaje => {
            await mensajesManager.guardarMensajes(mensaje)
            const mensajes = await mensajesManager.buscarMensajes()
            const mensajesParaFront = mensajes.map(m => ({
                ...m,
                fecha: new Date(m.timestamp).toLocaleTimeString()
            }))
            io.sockets.emit('actualizarMensajes', mensajesParaFront)
        })

        clientSocket.on('nuevoUsuario', async nombreUsuario => {
            clientSocket.broadcast.emit('nuevoUsuario', nombreUsuario)
        })

        const mensajes = await mensajesManager.buscarMensajes()
        const mensajesParaFront = mensajes.map(m => ({
            ...m,
            fecha: new Date(m.timestamp).toLocaleTimeString()
        }))
        io.sockets.emit('actualizarMensajes', mensajesParaFront)
    })

    res.render('chat', {
        user: req.user
    });
} catch (error) {
    next(error)
}

}