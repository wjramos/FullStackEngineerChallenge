const Sequelize = require('sequelize');
const sequelize = require('.');

class Review extends Sequelize.Model {}

Review.init(
  {
    employeeId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    assignedId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    feedback: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Review',
  },
);

module.exports = Review;