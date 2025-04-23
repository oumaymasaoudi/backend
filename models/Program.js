const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Program = sequelize.define('Program', {
    id_program: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titre: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    date_heure: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'programs',
    timestamps: true
});

module.exports = Program;
