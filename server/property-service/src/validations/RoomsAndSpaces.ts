import Joi from "joi";

const roomsAndSpacesSchema = Joi.object({
  bedrooms: Joi.number().integer().min(1).max(6).required().messages({
      "number.base": "Bedrooms must be a number.",
      "number.integer": "Bedrooms must be an integer.",
      "number.min": "Bedrooms cannot be less than 1.",
      "number.max": "Bedrooms cannot be more than 6.",
      "any.required": "Bedrooms field is required.",
    }),

  bathrooms: Joi.number().integer().min(1).max(20).required().messages({
      "number.base": "Bathrooms must be a number.",
      "number.integer": "Bathrooms must be an integer.",
      "number.min": "Bathrooms cannot be less than 1.",
      "number.max": "Bathrooms cannot be more than 20.",
      "any.required": "Bathrooms field is required.",
    }),

  livingRoom: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "Living Room must be a number.",
      "number.integer": "Living Room must be an integer.",
      "number.min": "Living Room cannot be less than 0.",
      "number.max": "Living Room cannot be more than 10.",
    }),

  lobbyLounge: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "Lobby Lounge must be a number.",
      "number.integer": "Lobby Lounge must be an integer.",
      "number.min": "Lobby Lounge cannot be less than 0.",
      "number.max": "Lobby Lounge cannot be more than 10.",
    }),

  helpersRoom: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "Helpers Room must be a number.",
      "number.integer": "Helpers Room must be an integer.",
      "number.min": "Helpers Room cannot be less than 0.",
      "number.max": "Helpers Room cannot be more than 10.",
    }),

  swimmingPool: Joi.number().integer().min(0).max(5).required().messages({
      "number.base": "Swimming Pool must be a number.",
      "number.integer": "Swimming Pool must be an integer.",
      "number.min": "Swimming Pool cannot be less than 0.",
      "number.max": "Swimming Pool cannot be more than 5.",
    }),

  parking: Joi.number().integer().min(0).max(20).required().messages({
      "number.base": "Parking must be a number.",
      "number.integer": "Parking must be an integer.",
      "number.min": "Parking cannot be less than 0.",
      "number.max": "Parking cannot be more than 20.",
    }),

  driversRoom: Joi.number().integer().min(0).max(5).required().messages({
      "number.base": "Driver's Room must be a number.",
      "number.integer": "Driver's Room must be an integer.",
      "number.min": "Driver's Room cannot be less than 0.",
      "number.max": "Driver's Room cannot be more than 5.",
    }),

  terrace: Joi.number().integer().min(0).max(5).required().messages({
      "number.base": "Terrace must be a number.",
      "number.integer": "Terrace must be an integer.",
      "number.min": "Terrace cannot be less than 0.",
      "number.max": "Terrace cannot be more than 5.",
    }),

  garden: Joi.number().integer().min(0).max(5).required().messages({
      "number.base": "Garden must be a number.",
      "number.integer": "Garden must be an integer.",
      "number.min": "Garden cannot be less than 0.",
      "number.max": "Garden cannot be more than 5.",
    }),

  diningArea: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "Dining Area must be a number.",
      "number.integer": "Dining Area must be an integer.",
      "number.min": "Dining Area cannot be less than 0.",
      "number.max": "Dining Area cannot be more than 10.",
      "any.required": "Dining Area field is required.",
    }),

  kitchenAvailable: Joi.boolean().required().messages({
      "boolean.base": "Kitchen availability must be true or false.",
      "any.required": "Kitchen availability field is required.",
    }),
});

export default roomsAndSpacesSchema;
