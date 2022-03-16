"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clubs", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clubName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "club_name",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("clubs");
  },
};
