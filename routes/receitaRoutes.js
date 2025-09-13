const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');
const comentarioController = require('../controllers/comentarioController');

// Home + paginação
router.get('/', receitaController.getHome);

// Busca
router.get('/search', receitaController.searchReceitas);

// Filtro por categoria
router.get('/categoria/:categoria', receitaController.filterByCategoria);

// Nova receita
router.get('/nova', receitaController.getNovaReceitaForm);
router.post('/nova', receitaController.postNovaReceita);

// Detalhes da receita
router.get('/receitas/:id', receitaController.getReceita);

// Adicionar comentário
router.post('/receitas/:id/comentarios', comentarioController.postComentario);

module.exports = router;
