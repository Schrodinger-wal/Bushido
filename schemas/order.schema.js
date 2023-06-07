const { SchemaType } = require('mongoose');
const moongose = require ('moongose');
const Schema = moongose.Schema;

const orderSchema = new Schema ({
    customerName: {
        type: String,
        required: true,
    },
    
    products: {
        type: [
            {
                productId: {
                    type: moongose.Schema.types.ObjectID, 
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