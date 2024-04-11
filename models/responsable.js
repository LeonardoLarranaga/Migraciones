'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Responsable.belongsToMany(models.Activo, {
        through: models.ActivoResponsables
      })
    }
  }
  Responsable.init({
    numeroEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Responsable',
  });
  return Responsable;
};