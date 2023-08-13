import { winstonLogger } from "../../utils/winstonLogger.js";


export function loggerController(req,res,next){
    try {
        req.logger.fatal("error fatal req.logger.fatal")
        winstonLogger.fatal("error fatal winstonLogger.fatal")
        req.logger.error(" error req.logger.error")
        winstonLogger.error("error  winstonLogger.error")
        req.logger.warning("warning req.logger.warning")
        winstonLogger.warning("warning winstonLogger.warning")
        req.logger.info("info req.logger.info")
        winstonLogger.info("info winstonLogger.info")
        req.logger.http("http req.logger.http")
        winstonLogger.http("http winstonLogger.http")
        req.logger.debug("debug req.logger.debug")
        winstonLogger.debug("debug winstonLogger.debug")
        res.send("Ok, para probar errores por winsonlogger en consola")
    } catch (error) {
        req.logger.fatal("error fatal req.logger.fatal")
        winstonLogger.fatal("error fatal winstonLogger.fatal")
        next(error)
    }
    
}