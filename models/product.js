import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String, 
        required: true, 
        unique: true
    },
    name: {
        type: String, 
        required: true
    },
    alternativeName: {
        type: [String],
        required: false,
        default: []
    },
    price: {
        type: Number, 
        required: true
    },
    labledPrice: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: false
    },
    imageUrl: { 
        type: [String],
        required: true,
        default: [
            "/images/default-product-1.jpg",
            "/images/default-product-2.jpg",
        ]
    },
    brand: {
        type: String, 
        required: false
    },
    model: {
        type: String, 
        required: false
    },
    category: {
        type: String, 
        required: true
     },
    isAvailable: {
        type: Boolean, 
        required: true,
        default: true
    },
    stock: {
        type: Number, 
        required: true,
        default: 0
    }

});

const Product = mongoose.model("Product", productSchema);

export default Product;