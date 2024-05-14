'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const models = require("../models")

    const activos = await models.Activo.findAll()
    
    const getTags = async function (nombres) {
      const t = []
      for (const nombre of nombres) t.push(await models.Tag.findOne({ where : { nombre: nombre }}))
      return t
    }

    const addTags = async function(activo, tags) {
      for (const tag of tags) await activo.addTag(tag)
    }

    const tags = [["Laptop", "Computadora"], ["Impresora", "Electrónica"], ["Laptop", "Computadora"], ["Smartwatch"], ["Electrónica"], ["Laptop", "Computadora", "Chromebook"], ["Laptop", "Computadora"], ["Altavoz", "Electrónica"], ["Electrónica"]]

    for (var i = 0; i < tags.length; i++) await addTags(activos[i], await getTags(tags[i]))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ActivoTags")
  }
};
