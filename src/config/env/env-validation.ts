import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging')
    .default('development'),
  PORT: Joi.number().port().default(3000).messages({
    'number.base': 'PORT environment variable must be a number.',
    'number.port': 'PORT environment variable must be a valid port',
  }),
  DB_PORT: Joi.number().required().messages({
    'number.required':
      'DB_PORT environment variable is not specified and it is required',
  }),
  DB_HOST: Joi.string().required().messages({
    'string.required':
      'DB_HOST environment variable is not specified and it is required',
  }),
  DB_NAME: Joi.string().required().messages({
    'string.required':
      'No DB_NAME environment variable specified and it is required',
  }),
  DB_USER: Joi.string().required().messages({
    'string.required':
      'DB_USER environment variable is not specified and it is required',
  }),
  DB_PASSWORD: Joi.string().required().messages({
    'string.required':
      'DB_PASSWORD environment variable is not specified and it is required',
  }),
});
