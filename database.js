const Sequelize = require('sequelize');

const sequelize = new Sequelize('railway', 'root', '6fQhtpMQJMnZTOOGpCyE', {
  host: 'containers-us-west-120.railway.app',
  port: 5916,
  dialect: 'mysql',
});

module.exports = sequelize;
