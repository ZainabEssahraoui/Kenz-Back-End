const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(' SERVER WORKS');
});

module.exports = app;
