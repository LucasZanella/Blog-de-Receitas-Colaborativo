const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    texto:{

    },
    autor: {

    },
    dataCriacao: {

    },
    receitaId: {

    }
});

module.exports = mongoose.model('Comentario', comentarioSchema);