'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Activos", "ubicacionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Ubicaciones",
        key: "id",
        as: "ubicacionId",
        onDelete: "SET NULL"
      }
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Activos", "ubicacionId");
  }
};
