const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Catalog = sequelize.define('catalogs', {
    id_catalog: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom_catalogue: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'catalogs',
    timestamps: true
});

module.exports = Catalog;
