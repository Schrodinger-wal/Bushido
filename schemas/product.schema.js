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
    image: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum:  [ 'Stock', 'Sin stock'],
        default: 'Stock'
    },
    category: {
        type: moongose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
})

module.exports = moongose.model('product', productSchema)