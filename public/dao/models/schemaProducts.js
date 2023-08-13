import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
// import { productManager } from '../ProductManager.js';

export const schemaProducts = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true, min: 1 },
    code: { type: String, required: true },
    category: { type: String, required: true , index: true },
    status: { type: Boolean},
    id: {type:String},
    owner: {type:String}
}, { versionKey: false })

schemaProducts.plugin(mongoosePaginate)
export const productsDB = mongoose.model('products', schemaProducts)

