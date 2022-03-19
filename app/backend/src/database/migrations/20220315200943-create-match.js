'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id',
        },
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
        allowNull: false,
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id',
        },
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
        allowNull: false,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};