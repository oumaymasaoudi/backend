const Catalog = require('../models/Catalog');

// Récupérer tous les catalogues
exports.getAllCatalogs = async (req, res) => {
    try {
        const catalogs = await Catalog.findAll();
        if (!catalogs || catalogs.length === 0) {
            return res.status(404).json({ message: "Aucun catalogue trouvé." });
        }
        res.status(200).json(catalogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un catalogue par ID
exports.getCatalogById = async (req, res) => {
    try {
        const { id } = req.params;
        const catalog = await Catalog.findByPk(id);
        if (!catalog) return res.status(404).json({ error: "Catalogue non trouvé" });
        res.status(200).json(catalog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer un catalogue
exports.createCatalog = async (req, res) => {
    try {
        const newCatalog = await Catalog.create(req.body);
        res.json(newCatalog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Mettre à jour un catalogue
exports.updateCatalog = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Catalog.update(req.body, { where: { id_catalog: id } });

        if (!updated[0]) return res.status(404).json({ error: "Catalogue non trouvé" });
        res.json({ message: "Catalogue mis à jour !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un catalogue
exports.deleteCatalog = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Catalog.destroy({ where: { id_catalog: id } });

        if (!deleted) return res.status(404).json({ error: "Catalogue non trouvé" });
        res.json({ message: "Catalogue supprimé !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
