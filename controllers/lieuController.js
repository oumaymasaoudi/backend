const Lieu = require('../models/lieu');

// Récupérer tous les lieux
exports.getAllLieux = async (req, res) => {
    try {
        const lieux = await Lieu.findAll();
        if (!lieux || lieux.length === 0) {
            return res.status(404).json({ message: "Aucun lieu trouvé." });
        }
        res.status(200).json(lieux);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Récupérer un seul lieu par ID
exports.getLieuById = async (req, res) => {
    try {
        const { id } = req.params;
        const lieu = await Lieu.findByPk(id);
        if (!lieu) return res.status(404).json({ error: "Lieu non trouvé" });
        res.status(200).json(lieu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Créer un lieu
exports.createLieu = async (req, res) => {
    try {
        const newLieu = await Lieu.create(req.body);
        res.json(newLieu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un lieu
exports.updateLieu = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Lieu.update(req.body, { where: { id_lieu: id } });

        if (!updated[0]) return res.status(404).json({ error: "Lieu non trouvé" });
        res.json({ message: "Lieu mis à jour !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un lieu
exports.deleteLieu = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Lieu.destroy({ where: { id_lieu: id } });

        if (!deleted) return res.status(404).json({ error: "Lieu non trouvé" });
        res.json({ message: "Lieu supprimé !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
