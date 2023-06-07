const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
        validator: function(value) {
            // Expresión regular mejorada para validar correo electrónico
            return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value);
        },
            message: props => `${props.value} no es un correo electrónico válido`
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 12,
        max: 110,
        required: true,
    },
    gender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)