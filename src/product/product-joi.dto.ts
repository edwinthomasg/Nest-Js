const Joi = require("joi")

export const productSchema = Joi.object({
    userId: Joi.number().required(),
    id: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required()
})