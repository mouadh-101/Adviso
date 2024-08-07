const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
import authRoutes from './routes/auth.js';

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/auth', authRoutes);

// Sync database
sequelize.sync();

module.exports = app;
