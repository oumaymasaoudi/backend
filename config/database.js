require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DIALECT, // ⚠ Assure-toi que DIALECT est bien défini
        logging: false
    }
);

// Test de connexion
sequelize.authenticate()
    .then(() => console.log("✅ Connexion réussie à la base de données"))
    .catch(err => console.error("❌ Erreur de connexion :", err));

// Synchronisation de la base
sequelize.sync({ force: false })  // force: true = reset la DB à chaque démarrage !
    .then(() => console.log("✅ Base de données synchronisée"))
    .catch(err => console.error("❌ Erreur de synchronisation :", err));

module.exports = sequelize;
