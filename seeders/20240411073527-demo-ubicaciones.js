'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ubicaciones", [
      {
        descripcion: "Ubicación principal donde se almacenan y gestionan los productos.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: "Ubicación para inventario de respaldo.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: "Espacio para solicitar y recibir productos o servicios prestados.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ubicaciones", null, {})
  }
};
