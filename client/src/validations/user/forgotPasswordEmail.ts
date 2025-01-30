import Joi from "joi";

export const forgotPasswordEmailValidationSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),

});
