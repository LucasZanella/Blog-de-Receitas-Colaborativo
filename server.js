require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// importa config do banco
const connectDB = require("./config/database");
connectDB();

// importa rotas
const receitaRoutes = require("./routes/receitaRoutes");

const app = express();

// configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, "public")));

// middlewares para ler body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas
app.use("/", receitaRoutes);

// rota fallback (404)
app.use((req, res) => {
  res.status(404).send("Página não encontrada");
});

// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});