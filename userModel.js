const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres", "postgres", "Elegeonye123", {
  dialect: "postgres",
});

const User = sequelize.define('users', {
  fname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isAlpha: true }
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isAlpha: true }
  },
  phone: {
    type: Sequelize.STRING,
    allownull: false,
    // validate: { isNumeric: true}
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
});

module.exports = User;