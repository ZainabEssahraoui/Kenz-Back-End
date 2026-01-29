require('dotenv').config();

const path = require('path');
const app = require('./app');

const connectDB = require(path.join(__dirname, '..', 'config', 'db.js'));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT ' + PORT);
});
