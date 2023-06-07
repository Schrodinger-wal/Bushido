const moongose = require ('mongoose');
const Schema = moongose.Schema;

const productSchema = new Schema({
    name: {
    type: String,
    required: true,
    },
    description: {
    type: String,
    required: true,
    },
    price: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
})

module.exports = moongose.model('product', productSchema)