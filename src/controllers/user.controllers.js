const catchError = require('../utils/catchError');
const User = require('../models/User');
const Rol = require('../models/Rol');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
	const results = await User.findAll({include:[Rol]});
	return res.json(results);
});

const create = catchError(async(req, res) => {
	const {Contraseña, ...rest} = req.body;
	const hashPassword = await bcrypt.hash(Contraseña, 10);
	const addUser = await User.create({ ...rest, Contraseña: hashPassword});
	return res.status(201).json(addUser)
});

const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await User.findByPk(id);
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await User.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const Datos = req.body;
	const {Contraseña, ...rest} = Datos;
	const hashPassword = await bcrypt.hash(Contraseña, 10);
	const result = await User.update(
		{...rest, Contraseña: hashPassword},
		{ where: {id}, returning: true }
	);
	if(result[1] == 0) return res.status(404).json({menssage: "El usuario no se actualizo porque no existe"})
	return res.json({menssage: "El usuario se actualizo exitosamente"});
});

const login = catchError(async(req, res) => {
	const {Correo, Contraseña} = req.body;
	const userEmail = await User.findOne({where: {Correo}})
	if(!userEmail) return res.status(404).json({menssage: "El usuario no existe en la base de datos"});

	const isValidPassword = await bcrypt.compare(Contraseña, userEmail.Contraseña)
	if(!isValidPassword) return res.status(404).json({menssage: "La contraseña es incorreta"});

	const token = jwt.sign(
		{userEmail},
		process.env.TOKEN_SECRET,
		{expiresIn: "1d"}
	)
	return res.json({userEmail, token})

})

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update,
	login
}