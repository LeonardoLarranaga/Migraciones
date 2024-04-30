'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activo extends Model {
    static associate(models) {
      models.Activo.belongsTo(models.Ubicacion, {
        foreignKey: "ubicacionId",
        onDelete: "SET NULL"
      })

      models.Activo.belongsTo(models.Responsable, {
        foreignKey: "responsableId",
        onDelete: "SET NULL"
      })

      models.Activo.belongsToMany(models.Tag, {
        through: models.ActivoTags,
        onDelete: "CASCADE"
      })
    }
  }
  Activo.init({
    numSerie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    numInventario: {
      type: DataTypes.INTEGER,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    ubicacionId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Activo',
  });
  return Activo;
};