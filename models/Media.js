const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Media = sequelize.define('Media', {
    id_media: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type_media: {
        type: DataTypes.STRING
    },
    url_media: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'media',
    timestamps: true
});

module.exports = Media;
