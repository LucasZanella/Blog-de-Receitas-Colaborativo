const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado!");
    } catch (err) {
        console.error("Erro ao se conectar:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;