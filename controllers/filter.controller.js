const Opportunite = require("../models/Opportunite");

/**
 * Filter Bourses by pays and filiere
 */
exports.filterBourses = async (req, res) => {
  try {
    const { pays, filiere } = req.query;
    const filter = { type: "Bourse" };

    if (pays) filter.pays = pays;
    if (filiere) filter.filiere = filiere;

    const bourses = await Opportunite.find(filter)
      .select("titre description image pays filiere")
      .sort({ createdAt: -1 });

    res.json(bourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Filter Evenements by pays and dateDebut
 */
exports.filterEvenements = async (req, res) => {
  try {
    const { pays, dateDebut } = req.query;
    const filter = { type: "Evenement" };

    if (pays) filter.pays = pays;
    if (dateDebut) filter.dateDebut = { $gte: new Date(dateDebut) };

    const evenements = await Opportunite.find(filter)
      .select("titre description image pays dateDebut dateFin lieu")
      .sort({ dateDebut: 1 });

    res.json(evenements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| SEARCH - by titre
| GET /opportunites/search?q=l
|--------------------------------------------------------------------------
*/
exports.searchByTitre = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Mot clé requis" });
    }

    const opportunites = await Opportunite.find({
      titre: {
        $regex: "^" + q,      // commence par la lettre
        $options: "i"         // insensible à la casse (L = l)
      }
    })
      .select("titre description image type")
      .sort({ createdAt: -1 });

    res.json(opportunites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/*
|--------------------------------------------------------------------------
| FILTER - Formations
| GET /opportunites/formations/filter
|--------------------------------------------------------------------------
| Query params:
| - mode_apprentissage
| - statut_financier
|--------------------------------------------------------------------------
*/
exports.filterFormations = async (req, res) => {
  try {
    const { mode_apprentissage, statut_financier } = req.query;

    const filter = {
      type: "Formation"
    };

    if (mode_apprentissage) {
      filter.mode_apprentissage = mode_apprentissage;
    }

    if (statut_financier) {
      filter.statut_financier = statut_financier;
    }

    const formations = await Opportunite.find(filter)
      .sort({ createdAt: -1 });

    res.json(formations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
