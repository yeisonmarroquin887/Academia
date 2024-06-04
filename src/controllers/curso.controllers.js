const catchError = require('../utils/catchError');
const Curso = require('../models/Curso');

const getAll = catchError(async(req, res) => {
	const results = await Curso.findAll();
	return res.json(results);
});

const create = catchError(async(req, res) => {
	const result = await Curso.create(req.body);
	return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Curso.findByPk(id);
	if(!result) return res.sendStatus(404);
	return res.json(result);
});

const remove = catchError(async(req, res) => {
	const { id } = req.params;
	await Curso.destroy({ where: {id} });
	return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
	const { id } = req.params;
	const result = await Curso.update(
		req.body,
		{ where: {id}, returning: true }
	);
	if(result[1] == 0) return res.status(404).json({menssage: "el curso no se actualizo porque no existe"})
		return res.json({menssage: "El curso se actualizo exitosamente"});
});

module.exports = {
	getAll,
	create,
	getOne,
	remove,
	update
}