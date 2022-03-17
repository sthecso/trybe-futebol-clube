'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
