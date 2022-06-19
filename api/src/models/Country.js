const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    // ID
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    // Nombre
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Imagen Bandera
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Continente
    continent:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Capital
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Subregion
    sub_region:{
      type: DataTypes.STRING,
    },
    // Area
    area:{
      type: DataTypes.INTEGER,
    },
    // Poblacion
    population:{
      type: DataTypes.INTEGER,
    }
  },{
    timestamps: false,
    createdAt: false,
  });
};
