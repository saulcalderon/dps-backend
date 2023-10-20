import { registerAs } from '@nestjs/config';

export const generalConfig = registerAs('general', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
}));
