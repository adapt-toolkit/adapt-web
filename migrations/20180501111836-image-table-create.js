'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('image', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          name: Sequelize.STRING,
          description: Sequelize.STRING,
          eth: Sequelize.STRING,
          amount: Sequelize.INTEGER,
          width: Sequelize.INTEGER,
          height: Sequelize.INTEGER,
          ext: Sequelize.STRING,
          category: Sequelize.STRING,
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('image');
  }
};
