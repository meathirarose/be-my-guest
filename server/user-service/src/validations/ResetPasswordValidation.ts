import Joi from "joi";

export const resetPasswordValidationSchema = Joi.object({
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
    
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.base': 'Confirm password must be a string',
        'string.empty': 'Confirm password cannot be empty',
        'any.required': 'Confirm password is required',
        'string.valid': 'Confirm password must match the password'
    }),

    token: Joi.string().required().messages({
        'any.required': 'Token is required.',
        'string.empty': 'Token cannot be empty.'
    }),

});
