const Sequelize = require('sequelize');
const sequelize = require('.');

class Review extends Sequelize.Model {}

Review.init(
  {
    employeeId: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    assignedId: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    feedback: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Review',
  },
);

module.exports = Review;