const {DataTypes} = require('sequelize');

// Ver el tema del defaultValue para name y difficulty
module.exports = (sequilize) => {
    sequilize.define('Activity',{
        // ID
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        // Nombre
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Dificultad
        difficulty:{
            type: DataTypes.INTEGER,
            validate:{
                min: 1,
                max: 5
            },
            defaultValue: 1
        },
        // Duracion 
        duration:{
            type: DataTypes.INTEGER,
        },
        // Temporada -> Verano Otonio Invierno Primavera
        season:{
            type: DataTypes.ENUM('Summer','Fall','Winter','Spring'),
            defaultValue: 'Summer'
        }
    },{
        timestamps: false,
        createdAt: false,
    });
};