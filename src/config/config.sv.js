import { Command } from 'commander'

const program = new Command()

program
  .option('-d, --debug', 'inicia modo debug', false)
  .option('-p, --port <port>', 'puerto de conexion', '8080')
  .option('-m, --mode <mode>', 'entorno de ejecucion', 'development')
  .option('-u, --user <user>', 'quien usa la aplicacion', 'user')
  .parse()

const options = program.opts()

export const DEBUG = Boolean(options.debug)
export const PORT = Number(options.port) || 8080
export const MODE = options.mode
export const USER = options.user