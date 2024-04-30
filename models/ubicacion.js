'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    static associate(models) {
      models.Ubicacion.hasMany(models.Activo, {
        foreignKey: "ubicacionId",
        onDelete: "SET NULL"
      })
    }
  }
  Ubicacion.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.BLOB('long')
    }
  }, {
    sequelize,
    modelName: 'Ubicacion',
    tableName: 'Ubicaciones'
  });
  return Ubicacion;
};