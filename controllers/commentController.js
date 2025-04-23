const Comment = require('../models/Comment');

// Récupérer tous les commentaires
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: "Aucun commentaire trouvé." });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un commentaire par ID
exports.getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) return res.status(404).json({ error: "Commentaire non trouvé" });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un commentaire
exports.createComment = async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Comment.update(req.body, { where: { id_comment: id } });

        if (!updated[0]) return res.status(404).json({ error: "Commentaire non trouvé" });
        res.json({ message: "Commentaire mis à jour !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Comment.destroy({ where: { id_comment: id } });

        if (!deleted) return res.status(404).json({ error: "Commentaire non trouvé" });
        res.json({ message: "Commentaire supprimé !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
