const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Clase = sequelize.define('clase', {
	Toma: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Aula: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Fecha: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Hora_Inicio: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Hora_Fin: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Estado: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Rgistro_Asistencia: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = Clase;