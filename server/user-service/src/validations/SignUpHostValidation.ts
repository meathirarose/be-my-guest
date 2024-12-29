import Joi from "joi";

export const signUpHostValidationSchema = Joi.object({
    fullName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
        'string.base': 'Full Name should be a type of text',
        'string.empty': 'Full Name cannot be empty',
        'string.min': 'Full Name should have atleast 3 characters',
        'string.max': 'Full Name should have atmost 50 characters',
        'any.required': 'Full Name is required'
    }),

    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),

    phoneNumber: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone Number is required.',
      'string.pattern.base': 'Phone Number must be between 10 and 15 digits.',
    }),

    country: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Country is required.',
      'string.min': 'Country name must be at least 2 characters long.',
      'string.max': 'Country name cannot exceed 50 characters.',
    }),

    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).+$/)
    .required()
    .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should contain 8 characters',
        'string.pattern.base': 'Password must contain at least one letter, one number, and one special character',
        'any.required': 'Password is required'
    }),

    confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'string.base': 'Confirm password must be a string',
        'string.empty': 'Confirm password cannot be empty',
        'any.required': 'Confirm password is required',
        'string.valid': 'Confirm password must match the password'
    }),
    
})