const mongoose = require('mongoose');

const receitaSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        min: 4,
        max: 35
    },
    ingredientes: {
        
    },
    instrucoes: {

    },
    autor: {

    },
    categoria: {

    },
    dataCriacao: {

    }
});

module.exports = mongoose.model('Receita', receitaSchema);