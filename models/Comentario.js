const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    receitaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receita',
        required: true
    }
});

module.exports = mongoose.model('Comentario', comentarioSchema);