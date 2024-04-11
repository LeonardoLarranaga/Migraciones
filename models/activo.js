'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Activo.belongsToMany(models.Responsable, {
        through: models.ActivoResponsables
      })

      models.Activo.belongsTo(models.Ubicacion, {
        foreignKey: "ubicacionId",
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
      type: DataTypes.BLOB,
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