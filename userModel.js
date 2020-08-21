const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres", "postgres", "Elegeonye123", {
  dialect: "postgres",
});

const User = sequelize.define('users', {
  fname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false
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
}, {
  timestamps: false
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log(`Database & tables created!`);
  });

//console.log(userSchema === sequelize.models.userSchema)

module.exports = User;