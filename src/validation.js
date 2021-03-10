const Joi = require('@hapi/joi')

// Register Validation
module.exports.registerValidation = async (data) => {
	const schema = Joi.object({
		nick: Joi.string().min(3).required(),
		password: Joi.string().min(6).required(),
		gender: Joi.string().required(),
		biogram: Joi.string()
	})
	// console.log(await schema.validate(data).details);
	return schema.validate(data)
}

// Login Validation
module.exports.loginValidation = (data) => {
	const schema = Joi.object({
		nick: Joi.string().min(3).required(),
		password: Joi.string().min(6).required()
	})
	return schema.validate(data)
}
