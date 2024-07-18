const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sync database
sequelize.sync();

module.exports = app;
