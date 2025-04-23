const Oeuvre = require('../models/Oeuvre');

// Récupérer toutes les œuvres
exports.getAllOeuvres = async (req, res) => {
    try {
        const oeuvres = await Oeuvre.findAll();
        if (!oeuvres || oeuvres.length === 0) {
            return res.status(404).json({ message: "Aucune œuvre trouvée." });
        }
        res.status(200).json(oeuvres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une œuvre par ID
exports.getOeuvreById = async (req, res) => {
    try {
        const { id } = req.params;
        const oeuvre = await Oeuvre.findByPk(id);
        if (!oeuvre) return res.status(404).json({ error: "Œuvre non trouvée" });
        res.status(200).json(oeuvre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer une œuvre
exports.createOeuvre = async (req, res) => {
    try {
        const newOeuvre = await Oeuvre.create(req.body);
        res.json(newOeuvre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une œuvre
exports.updateOeuvre = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Oeuvre.update(req.body, { where: { id_oeuvre: id } });

        if (!updated[0]) return res.status(404).json({ error: "Œuvre non trouvée" });
        res.json({ message: "Œuvre mise à jour !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une œuvre
exports.deleteOeuvre = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Oeuvre.destroy({ where: { id_oeuvre: id } });

        if (!deleted) return res.status(404).json({ error: "Œuvre non trouvée" });
        res.json({ message: "Œuvre supprimée !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
