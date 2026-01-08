/* ========= SEARCH ========= */
exports.applySearch = (filter, search) => {
    if (!search) return;
  
    filter.$or = [
      { titre: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { organisme: { $regex: search, $options: "i" } }
    ];
  };
  
  /* ========= COMMON FILTERS ========= */
  
  exports.filterByPays = (filter, pays) => {
    if (pays && pays !== "Any Location") {
      filter.pays = pays;
    }
  };
  
  exports.filterBySubject = (filter, filiere) => {
    if (filiere) {
      filter.filiere = { $in: filiere.split(",") };
    }
  };
  
  /* ========= DATE FILTERS ========= */
  
  exports.filterByEventDate = (filter, date) => {
    if (!date) return;
  
    const now = new Date();
    let start, end;
  
    if (date === "thisWeek") {
      start = now;
      end = new Date();
      end.setDate(now.getDate() + 7);
    }
  
    if (date === "nextMonth") {
      start = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      end = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    }
  
    filter.dateDebut = { $gte: start, $lte: end };
  };
  
  exports.filterClosingSoon = (filter, days = 7) => {
    const today = new Date();
    const soon = new Date();
    soon.setDate(today.getDate() + days);
  
    filter.dateLimite = {
      $gte: today,
      $lte: soon
    };
  };
  
  /* ========= FORMATION FILTERS ========= */
  
  exports.filterByFormat = (filter, format) => {
    if (!format) return;
  
    const formats = format.split(",");
    const mapped = [];
  
    if (formats.includes("online")) mapped.push("distance");
    if (formats.includes("inPerson")) mapped.push("presentiel");
  
    if (mapped.length > 0) {
      filter.mode_apprentissage = { $in: mapped };
    }
  };
  
  exports.filterByPrice = (filter, price) => {
    if (!price || price === "all") return;
    filter.statut_financier = price;
  };
  
  /* ========= ACADEMIC LEVEL ========= */
  
  exports.filterByNiveau = (filter, niveau) => {
    if (niveau) {
      filter.niveau_academique = { $in: niveau.split(",") };
    }
  };
  