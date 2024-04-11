'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivoResponsables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivoResponsables.init({
    numSerieActivo: DataTypes.INTEGER,
    numeroEmpleadoResponsable: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ActivoResponsables',
  });
  return ActivoResponsables;
};