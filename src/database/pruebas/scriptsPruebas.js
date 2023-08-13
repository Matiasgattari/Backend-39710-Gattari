import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
import { winstonLogger } from '../../utils/winstonLogger';

await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
winstonLogger.info(`conectado a base de datos en ${'mongodb://127.0.0.1:27017/ecommerce'}`)
