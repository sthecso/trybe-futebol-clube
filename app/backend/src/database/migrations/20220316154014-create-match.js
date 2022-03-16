"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matchs", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "home_team",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "clubs",
          key: "id",
        },
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "home_team_goals",
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "away_team",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "clubs",
          key: "id",
        },
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "away_team_goals",
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: "in_progress",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matchs");
  },
};
