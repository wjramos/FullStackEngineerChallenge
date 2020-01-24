const Sequelize = require('sequelize');
const sequelize = require('.');

class Employee extends Sequelize.Model {}

Employee.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
  },
);

module.exports = Employee;