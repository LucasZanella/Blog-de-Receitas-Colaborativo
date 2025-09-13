const Comentario = require('../models/Comentario');

exports.postComentario = async (req, res) => {
  try {

    const { texto, autor } = req.body;
    const receitaId = req.params.id;

    if (!texto || !autor) {
      return res.status(400).send('Todos os campos são obrigatórios');
    }

    const comentario = new Comentario({
      texto: texto.trim(),
      autor: autor.trim(),
      receitaId
    });

    await comentario.save();
    res.redirect(`/receitas/${receitaId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao adicionar comentário');
  }
};