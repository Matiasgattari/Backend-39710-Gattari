import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const schemaCarts = new mongoose.Schema({
    id: { type: String, required: true, unique:true },
    quantity: { type: Number },
    products: {
        type: [
            {
                productID: {
                        type: Schema.Types.ObjectId, 
                        ref: 'products'
                    },
                quantity:{ type: Number }
            }
        ],
        default: [], 
    }
}, { versionKey: false })


schemaCarts.pre(/^find/, function (next) {
    this.populate('products.productID')
    next()
})

schemaCarts.plugin(mongoosePaginate)

export const cartsDB = mongoose.model('carts', schemaCarts)

