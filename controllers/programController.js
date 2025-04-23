const Program = require('../models/Program');

// Récupérer tous les programmes
exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.findAll();
        if (!programs || programs.length === 0) {
            return res.status(404).json({ message: "Aucun programme trouvé." });
        }
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un seul programme par ID
exports.getProgramById = async (req, res) => {
    try {
        const { id } = req.params;
        const program = await Program.findByPk(id);
        if (!program) return res.status(404).json({ error: "Programme non trouvé" });
        res.status(200).json(program);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un programme
exports.createProgram = async (req, res) => {
    try {
        const newProgram = await Program.create(req.body);
        res.status(201).json(newProgram);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un programme
exports.updateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Program.update(req.body, { where: { id } });

        if (!updated[0]) return res.status(404).json({ error: "Programme non trouvé" });
        res.json({ message: "Programme mis à jour !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un programme
exports.deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Program.destroy({ where: { id } });

        if (!deleted) return res.status(404).json({ error: "Programme non trouvé" });
        res.json({ message: "Programme supprimé !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
