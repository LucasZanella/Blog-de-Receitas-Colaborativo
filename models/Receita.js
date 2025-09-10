const mongoose = require('mongoose');

const receitaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 4,
        maxlength: 35
    },
    ingredientes: {
        type: [String],
        required: true,
        validate: [(arr) => arr.length > 0, 'A receita deve ter ao menos 1 ingrediente']
    },
    instrucoes: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        enum: ['Massas', 'Sobremesas', 'Vegano', 'Carnes', 'Saladas'],
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Receita', receitaSchema);