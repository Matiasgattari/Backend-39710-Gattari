import { winstonLogger } from "../utils/winstonLogger.js"

//manejador de errores API REST (el manejo de erroes en web, es con redirects)
export function manejadorDeErrores(error, req, res, next) {
    switch (error.tipo) {
        case 'Campo-vacio':
            res.status(401).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'Campo-con-valor-invalido':
            res.status(401).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'NOT-FOUND':
            res.status(401).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'SERVER-COMUNICATION-ERROR':
            res.status(401).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'CREACION-FALLIDA':
            res.status(403).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'MODIFICACION-FALLIDA':
            res.status(403).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'Producto-duplicado':
            res.status(403).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'ELIMINACION-FALLIDA':
            res.status(403).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'ERROR_DE_AUTENTICACION':
            res.status(401).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        case 'ERROR_DE_PERMISOS':
            res.status(403).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
            break
        default:
            res.status(500).json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
    }
    
    winstonLogger.fatal("******************************* Informacion de error ****************************************************** ")
    winstonLogger.fatal( "Error: " + error.message )
    winstonLogger.fatal("*********************************************************************************************************** ")
    // res.json({Comunicado:"ERROR", Tipo:error.tipo,Mensaje: error.message })
}
