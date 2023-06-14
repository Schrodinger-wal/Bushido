const { SchemaType } = require('mongoose');
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    customerName: {
        type: String,
        required: true,
    },
    
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId, 
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: 1,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            }
            ],
    required : true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('order', orderSchema);