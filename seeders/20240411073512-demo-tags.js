'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tags", [
      {
        nombre: "Laptop",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Computadora",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Impresora",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Smartwatch",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Chromebook",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Altavoz",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", null, {})
  }
};
