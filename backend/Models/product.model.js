import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum:["cloths", "accessories", "stationary", "vehicle", "others"],
        required: true,
    }
},
{
    timestamps : true,
}
)


const Product = mongoose.model('products', productSchema)


export default Product