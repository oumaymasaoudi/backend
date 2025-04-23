const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Oeuvre = sequelize.define('Oeuvre', {
    id_oeuvre: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.TEXT
    },
    prix: {
        type: DataTypes.FLOAT
    },
    titre: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'oeuvres',
    timestamps: true
});

module.exports = Oeuvre;
