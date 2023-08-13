import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Servidor API express',
      description:
        'Servidor de una API REST, creado con express y documentado con swagger. Documentacion de endpoints',
      contact: { name: 'Leandro Matías Gattari', email: 'lea.mg90@gmail.com', url: 'https://github.com/Matiasgattari/'} 
    },
  },
  apis: ['./docs/**/*.yaml'],
}

const specs = swaggerJsdoc(options)

export const docsRouter = Router()

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs))

