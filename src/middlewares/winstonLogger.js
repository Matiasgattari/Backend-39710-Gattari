import { winstonLogger } from "../utils/winstonLogger.js"

export const loggerPeticion = (req, res, next) => {
    req.logger = winstonLogger
    req.logger.info(`Metodo: ${req.method} - Url: ${req.url} - Fecha: ${new Date().toLocaleTimeString()}`)
    next()
}
