const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');


const eventRoutes = require('./routes/eventRoutes');
const participantRoutes = require('./routes/participantRoutes');
const authRoutes = require('./routes/auth');
const proRoutes = require('./routes/Proroutes');

const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));


app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/professionnels', proRoutes);


// Connexion BDD
sequelize.sync({ alter: true }).then(() => {
    console.log("Base de données synchronisée avec mise à jour");
  }).catch(err => console.error("Erreur de synchronisation :", err));
  
// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
