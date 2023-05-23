const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server started'));
});
