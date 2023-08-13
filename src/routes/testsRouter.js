import { Router } from 'express';
import { soloAdmin, soloLogueados } from '../middlewares/soloLogueados.js';
import { mockingController } from '../controllers/mocking.controller.js';
import { loggerController } from '../controllers/web/logger.controller.js';

export const testsRouter = Router()

// MOCKING
testsRouter.get('/mockingproducts',soloLogueados,soloAdmin, mockingController);

//LOGGER
testsRouter.get('/loggerTest', soloLogueados,loggerController)