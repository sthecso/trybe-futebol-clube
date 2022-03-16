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
      home_team: {
        allowNull: false,
        type: Sequelize.NUMBER,
        field: 'homeTeam',
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.NUMBER,
        field: 'HomeTeamGoals',
      },
      away_team: {
        allowNull: false,
        type: Sequelize.NUMBER,
        field: 'awayTeam',
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      clubId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'matchs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
