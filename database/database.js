const Sequelize = require("sequelize");
const conection = new Sequelize("guiaperguntas", "root1", "1250Br_22", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = conection;