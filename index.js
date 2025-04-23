const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(morgan('dev')); 

app.use('/api/catalogs', require('./routes/catalogRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/lieux', require('./routes/lieuRoutes')); 
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/oeuvres', require('./routes/oeuvreRoutes'));
app.use('/api/participants', require('./routes/participantRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/users', require('./routes/auth'));

app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
