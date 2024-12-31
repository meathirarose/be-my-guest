import Joi from "joi";

export const signInHostValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .messages({
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email cannot be empty',
        }),
    
    phoneNumber: Joi.string()
        .pattern(/^\d{10,15}$/)
        .messages({
            'string.empty': 'Phone Number is required.',
            'string.pattern.base': 'Phone Number must be between 10 and 15 digits.',
        }),
})
    .xor('email', 'phoneNumber') 
    .messages({
        'object.missing': 'Either email or phone number must be provided.',
    });
