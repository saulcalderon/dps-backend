import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging')
    .default('development'),
  PORT: Joi.number().port().default(3000).messages({
    'number.base': 'PORT environment variable must be a number.',
    'number.port': 'PORT environment variable must be a valid port',
  }),
  FIREBASE_PUBLIC_CERTIFICATE: Joi.string().required().messages({
    'string.required':
      'FIREBASE_PUBLIC_CERTIFICATE environment variable is not specified and it is required',
  }),
  FIREBASE_PRIVATE_KEY: Joi.string().required().messages({
    'string.required':
      'FIREBASE_PRIVATE_KEY environment variable is not specified and it is required',
  }),
  FIREBASE_CLIENT_EMAIL: Joi.string().required().messages({
    'string.required':
      'FIREBASE_CLIENT_EMAIL environment variable is not specified and it is required',
  }),
  FIREBASE_PROJECT_ID: Joi.string().required().messages({
    'string.required':
      'FIREBASE_PROJECT_ID environment variable is not specified and it is required',
  }),
});
