import Joi from "joi";

export const updateProfileValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 50 characters',
        'any.required': 'Name is required'
    }),

    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),

    country: Joi.string().required().messages({
        'string.empty': 'Country cannot be empty',
        'any.required': 'Country is required'
    }),

    profileImage: Joi.string().uri().optional().messages({
        'string.uri': 'Profile image must be a valid URL',
    })
});
