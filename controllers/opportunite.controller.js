const Opportunite = require("../models/Opportunite");
const Bourse = require("../models/Bourse");
const Formation = require("../models/Formation");
const Evenement = require("../models/Evenement");

/*
|--------------------------------------------------------------------------
| Create - LIST (Angular cards)
| POST /Opportunity /opportunites?type=Bourse
|--------------------------------------------------------------------------
*/
exports.create = async (req, res) => {
  try {
    const { type, ...data } = req.body;
    let opportunite;

    if (type === "Bourse") {
      opportunite = new Bourse(data);
    } else if (type === "Formation") {
      opportunite = new Formation(data);
    } else if (type === "Evenement") {
      opportunite = new Evenement(data);
    } else {
      return res.status(400).json({ error: "Type invalide" });
    }

    await opportunite.save();
    res.status(201).json(opportunite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| READ - LIST (Angular cards)
| GET /opportunites?type=Bourse
|--------------------------------------------------------------------------
*/
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }

    const opportunites = await Opportunite.find(filter)
      .select("titre description image type")
      .sort({ createdAt: -1 });

    res.json(opportunites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| READ - DETAILS
| GET /opportunites/:id
|--------------------------------------------------------------------------
*/
/// Nadia Get details of a specific opportunite by ID(show the rest af champs in every opportunity)

/*
|--------------------------------------------------------------------------
| READ - DETAILS
| GET /opportunites/:id
|--------------------------------------------------------------------------
*/
exports.getDetails = async (req, res) => {
  try {
    const opportunite = await Opportunite.findById(req.params.id);

    if (!opportunite) {
      return res.status(404).json({ error: "Opportunité introuvable" });
    }

    // Mongoose discriminator automatically returns the correct type
    res.json(opportunite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*

|--------------------------------------------------------------------------
| UPDATE
| PUT /opportunites/:id
|--------------------------------------------------------------------------
*/
exports.update = async (req, res) => {
  try {
    const opportunite = await Opportunite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(opportunite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE
| DELETE /opportunites/:id
|--------------------------------------------------------------------------
*/
exports.remove = async (req, res) => {
  try {
    await Opportunite.findByIdAndDelete(req.params.id);
    res.json({ message: "Opportunite deleted successfully" });
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
