const Opportunite = require("../models/Opportunite");
const {
  applySearch,
  filterByPays,
  filterBySubject,
  filterByEventDate,
  filterByNiveau,
  filterClosingSoon,
  filterByFormat,
  filterByPrice
} = require("../utils/filter.util");

/* =======================
   EVENTS
======================= */

exports.filterEvents = async (req, res) => {
  try {
    const { search, filiere, pays, date } = req.query;

    let filter = { type: "Evenement" };

    applySearch(filter, search);
    filterBySubject(filter, filiere);
    filterByPays(filter, pays);
    filterByEventDate(filter, date);

    const events = await Opportunite.find(filter).sort({ dateDebut: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Event filtering failed" });
  }
};

/* =======================
   BOURSES
======================= */

exports.filterBourses = async (req, res) => {
  try {
    const { search, filiere, pays, niveau, closingSoon } = req.query;

    let filter = { type: "Bourse" };

    applySearch(filter, search);
    filterBySubject(filter, filiere);
    filterByPays(filter, pays);
    filterByNiveau(filter, niveau);

    if (closingSoon === "true") {
      filterClosingSoon(filter);
    }

    const bourses = await Opportunite.find(filter).sort({ dateLimite: 1 });

    res.status(200).json(bourses);
  } catch (error) {
    res.status(500).json({ message: "Bourse filtering failed" });
  }
};

/* =======================
   FORMATIONS
======================= */

exports.filterFormations = async (req, res) => {
  try {
    const { search, format, price } = req.query;

    let filter = { type: "Formation" };

    applySearch(filter, search);
    filterByFormat(filter, format);
    filterByPrice(filter, price);

    const formations = await Opportunite.find(filter).sort({ createdAt: -1 });

    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: "Formation filtering failed" });
  }
};

/*
|--------------------------------------------------------------------------
| SEARCH  HOME- by titre
| GET /opportunites/search?titre=l
|--------------------------------------------------------------------------
*/
exports.searchByTitre = async (req, res) => {
  try {
    const { titre } = req.query;

    if (!titre) {
      return res.status(400).json({ error: "Mot clé requis" });
    }

    const opportunites = await Opportunite.find({
      titre: {
        $regex: "^" + titre,   // commence par la lettre
        $options: "i"          // insensible à la casse
      }
    }).sort({ createdAt: -1 });

    res.json(opportunites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
