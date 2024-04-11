'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsable extends Model {
    static associate(models) {
      models.Responsable.hasMany(models.Activo, {
        foreignKey: "responsableId",
        onDelete: "SET NULL"
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