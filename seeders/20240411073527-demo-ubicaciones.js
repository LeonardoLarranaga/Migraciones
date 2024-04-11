'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ubicaciones", [
      {
        descripcion: "Ubicación principal donde se almacenan y gestionan los productos, facilitando el control y distribución eficiente desde un punto central.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: "Ubicación adicional utilizada para almacenar inventario de respaldo, garantizando disponibilidad rápida en caso de agotamiento en el almacén principal.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: "Espacio para solicitar y recibir productos o servicios prestados, diseñado para una gestión rápida y eficiente, con personal disponible para asistir a los usuarios.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ubicaciones", null, {})
  }
};
