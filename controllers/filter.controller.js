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
