const Sequelize = require('sequelize');
const sequelize = require('.');

class Review extends Sequelize.Model {}

Review.init(
  {
    employeeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    assignedId: {
      type: Sequelize.INTEGER,
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