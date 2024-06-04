const sequelize = require("../utils/connection")
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
	Nombres: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Apellidos: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Correo: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Contraseña: {
		type: DataTypes.STRING,
		allowNull: false
	},
	Telefono: {
		type: DataTypes.STRING,
		allowNull: false
	}
})

User.prototype.toJSON = function() {
	const value = Object.assign({}, this.get());
	delete value.Contraseña;
	return value
}

module.exports = User