import Joi from "joi";

export const signInValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/-]).+$/)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should contain 8 characters',
            'string.pattern.base': 'Password must contain at least one letter, one number, and one special character',
            'any.required': 'Password is required'
        }),
});
