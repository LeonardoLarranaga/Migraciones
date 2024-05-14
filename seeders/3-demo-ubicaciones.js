'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Ubicaciones", [
      {
        descripcion: "Almacenamiento principal.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1549194388-f61be84a6e9e?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: "Inventario de respaldo.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1504376830547-506dedfe1fe9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: "Ventanilla de préstamos.",
        imagen: await obtenerImagen("https://images.unsplash.com/photo-1609341462678-3fe6af5d353d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ubicaciones") 
    await queryInterface.sequelize.query("alter table ubicaciones auto_increment = 1;")
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