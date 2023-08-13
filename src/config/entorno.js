import dotenv from 'dotenv'

dotenv.config({
  path: 'env.config'
})

//Con esta linea de codigo acepto aplicaciones no autorizadas por google en mi proyecto. riesgoso.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const entorno = process.env


export default entorno

export const variableEntorno = entorno.NODE_ENV || 'development'