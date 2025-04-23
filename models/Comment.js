const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
    id_comment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: false,  // Ajout de la validation
        validate: {
            notEmpty: {
                msg: 'Le commentaire ne peut pas être vide.'
            }
        }
    },
    date_commentaire: {
        type: DataTypes.DATE,
        allowNull: false, // Ajout de la validation
        defaultValue: DataTypes.NOW, // Valeur par défaut à la date actuelle si non fournie
    }
}, {
    tableName: 'comments',
    timestamps: true
});

module.exports = Comment;
