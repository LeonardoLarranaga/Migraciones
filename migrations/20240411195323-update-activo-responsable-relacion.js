'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("Activos", "responsableId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Responsables",
        key: "id",
        as: "responsableId",
        onDelete: "SET NULL"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Activos", "responsableId")
  }
};
