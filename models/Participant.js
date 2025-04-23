const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./Event'); 
const Participant = sequelize.define('Participant', {
  id_participant: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_event: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ville: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motivation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: 'en attente',
  },
  date_inscription: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  
}, {
  tableName: 'participants',
  timestamps: false,
});



Participant.belongsTo(Event, { as: 'evenement', foreignKey: 'id_event' });


module.exports = Participant;
