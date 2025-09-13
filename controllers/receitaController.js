const Receita = require('../models/Receita');
const Comentario = require('../models/Comentario');

// Página inicial com lista de receitas + paginação
exports.getHome = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 5;
    let skip = (page - 1) * limit;

    const receitas = await Receita.find()
      .sort({ dataCriacao: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Receita.countDocuments();

    res.render('home', {
      receitas,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    console.error("Erro em getHome:", err);
    res.status(500).send('Erro ao carregar receitas');
  }
};

// Busca por título ou ingrediente
exports.searchReceitas = async (req, res) => {
  try {
    const query = req.query.q;
    const receitas = await Receita.find({
      $or: [
        { titulo: { $regex: query, $options: 'i' } },
        { ingredientes: { $regex: query, $options: 'i' } }
      ]
    });
    res.render('home', { receitas, currentPage: 1, totalPages: 1 });
  } catch (err) {
    res.status(500).send('Erro na busca');
  }
};

// Filtrar por categoria
exports.filterByCategoria = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const receitas = await Receita.find({ categoria });
    res.render('home', { receitas, currentPage: 1, totalPages: 1 });
  } catch (err) {
    res.status(500).send('Erro ao filtrar categoria');
  }
};

// Página de detalhes da receita
exports.getReceita = async (req, res) => {
  try {
    const receita = await Receita.findById(req.params.id);
    const comentarios = await Comentario.find({ receitaId: receita._id }).sort({ dataCriacao: -1 });
    res.render('receita', { receita, comentarios });
  } catch (err) {
    console.error("Erro em getHome:", err);
    res.status(500).send('Erro ao carregar receita');
  }
};

// Página para criar nova receita
exports.getNovaReceitaForm = (req, res) => {
  res.render('novaReceita');
};

// Criar nova receita
exports.postNovaReceita = async (req, res) => {
  try {
    const { titulo, ingredientes, instrucoes, autor, categoria } = req.body;
    const receita = new Receita({
      titulo,
      ingredientes: ingredientes.split(',').map(i => i.trim()),
      instrucoes,
      autor,
      categoria
    });
    await receita.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Erro ao adicionar receita');
  }
};