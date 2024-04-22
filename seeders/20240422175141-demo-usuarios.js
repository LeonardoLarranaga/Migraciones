'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Usuarios", [
      {
        login: "administrador",
        password: "admin123",
        permisos: "rwd",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        login: "webapi",
        password: "vuetify",
        permisos: "r",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        login: "creador",
        password: "creador9999",
        permisos: "rw",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", null, {})
  }
};
