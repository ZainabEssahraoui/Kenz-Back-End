const Opportunite = require("../models/Opportunite");
const Bourse = require("../models/Bourse");
const Formation = require("../models/Formation");
const Evenement = require("../models/Evenement");
const { notifyNewOpportunity } = require("../utils/notificationTrigger");


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

    // TRIGGER notification création
    await notifyNewOpportunity(opportunite);

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

    const opportunites = await Opportunite.find(filter).sort({ createdAt: -1 });

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
exports.getDetails = async (req, res) => {
  try {
    const opportunite = await Opportunite.findById(req.params.id);

    if (!opportunite) {
      return res.status(404).json({ error: "Opportunité introuvable" });
    }

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
    if (req.body.type) {
      return res.status(403).json({
        error: "La modification du type est interdite"
      });
    }

    const opportunite = await Opportunite.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
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
