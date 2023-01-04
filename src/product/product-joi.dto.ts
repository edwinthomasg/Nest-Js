import Joi from "joi";

export const productSchema = Joi.object({
    id: Joi.number().required(),
    userId: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required()
})