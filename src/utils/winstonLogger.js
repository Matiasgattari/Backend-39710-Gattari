import { variableEntorno } from '../config/entorno.js'
import winston from 'winston'

// const levelsWinston = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
// }
const levelsWinston = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}


const loggerDesarrollo = winston.createLogger({
  levels: levelsWinston,
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
    new winston.transports.File({
        level: "error",
        filename: 'desarrollo.log'
      })

  ]
})

const loggerProduccion = winston.createLogger({
  levels: levelsWinston,
   transports: [
    new winston.transports.File({
      level: "http",
      filename: 'eventos.log'
    }),
    new winston.transports.Console({
        level: "info"
      })
  ]
})

export let winstonLogger
if (variableEntorno === 'production') {
  winstonLogger = loggerProduccion
} else {
  winstonLogger = loggerDesarrollo
}