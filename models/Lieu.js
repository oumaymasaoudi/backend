const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lieu = sequelize.define('lieus', { 
    id_lieu: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nom: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    adresse: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    latitude: { 
        type: DataTypes.FLOAT 
    },
    longitude: { 
        type: DataTypes.FLOAT 
    },
    description: { 
        type: DataTypes.TEXT 
    }
}, {
    tableName: 'lieus',
    timestamps: true
});

module.exports = Lieu;
