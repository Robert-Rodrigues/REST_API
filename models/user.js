const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  deletedAt: Sequelize.DATE,
}, {
  paranoid: true,
});

module.exports = User;

