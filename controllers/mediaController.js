const Media = require('../models/Media');


// Récupérer tous les médias
exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.findAll();
        if (!media || media.length === 0) {
            return res.status(404).json({ message: "Aucun média trouvé." });
        }
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un média par ID
exports.getMediaById = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findByPk(id);
        if (!media) return res.status(404).json({ error: "Média non trouvé" });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un média
exports.createMedia = async (req, res) => {
    try {
        const newMedia = await Media.create(req.body);
        res.json(newMedia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un média
exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Media.update(req.body, { where: { id_media: id } });

        if (!updated[0]) return res.status(404).json({ error: "Média non trouvé" });
        res.json({ message: "Média mis à jour !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un média
exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Media.destroy({ where: { id_media: id } });

        if (!deleted) return res.status(404).json({ error: "Média non trouvé" });
        res.json({ message: "Média supprimé !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
