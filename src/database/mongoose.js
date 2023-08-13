import mongoose, { Schema } from 'mongoose';
import { MONGODB_PATH } from '../config/config.mongo.js';
import { winstonLogger } from '../utils/winstonLogger.js';

export const inicioMongoose = await mongoose.connect(MONGODB_PATH)
winstonLogger.info(`conectado a base de datos en ${MONGODB_PATH}`)



