'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const models = require("../models")

    const addActivo = async function(responsableId, activoId) {
      const activo = await models.Activo.findOne({ where: { id: activoId }})
      activo.responsableId = responsableId
      await activo.save()
    }
    
    await addActivo(1, 1)
    await addActivo(2, 2)
    await addActivo(3, 3)
    await addActivo(1, 4)
    await addActivo(2, 5)
    await addActivo(3, 6)
    await addActivo(1, 7)
    await addActivo(2, 8)
    await addActivo(3, 9)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("update activos set responsableId = null;")
  }
};
