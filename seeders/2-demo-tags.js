'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tags", [
      {
        nombre: "Laptop", // 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Computadora", // 2
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Impresora", // 3
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Smartwatch", // 4
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Chromebook", // 5
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Altavoz", // 6
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Electrónica", // 7
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags")
    await queryInterface.sequelize.query("alter table tags auto_increment = 1;")
  }
};
