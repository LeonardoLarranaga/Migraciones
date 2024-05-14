'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Responsables", [
      {
        numeroEmpleado: 1991,
        nombre: "Emilio Hernández",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1581092163144-b7ae3c00adbc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroEmpleado: 1989,
        nombre: "María Debé",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroEmpleado: 2004,
        nombre: "Mai Esecuele",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1581091224003-01e7c2e69f6f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Responsables")
    await queryInterface.sequelize.query("alter table responsables auto_increment = 1;")
  }
};

async function obtenerImagen(url) {
  const axios = require('axios')

  try {
      return (await axios.get(url, { responseType: 'arraybuffer'})).data
  } catch {
      return null
  }
}