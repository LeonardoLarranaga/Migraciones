'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Responsables", [
      {
        numeroEmpleado: 1991,
        nombre: "Emilio Hernández",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroEmpleado: 1989,
        nombre: "María Debé",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroEmpleado: 2004,
        nombre: "Mario Pérez",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ubicaciones", null, {})
  }
};
