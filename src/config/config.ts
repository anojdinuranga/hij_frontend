import * as dotenv from 'dotenv';
import * as path from 'path';
import Joi from 'joi';

dotenv.config( {path: path.join(__dirname, '..', '../.env')} );

interface EnvVars {
  NODE_ENV?: 'production' | 'development' | 'test';
  JWT_A_MAX_AGE: string,
  PORT?: number;
  BACKEND_DOMAIN: string;
  SYSTEM_DOMAIN: string;
}

const envVarsSchema = Joi.object<EnvVars>({
  NODE_ENV: Joi.string().valid('production', 'development', 'test'),
  PORT: Joi.number().default(8000),
  BACKEND_DOMAIN: Joi.string().description('Domain name'),
  SYSTEM_DOMAIN: Joi.string().description('Backend Domain name'),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const isProduction = envVars.NODE_ENV === "production";
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt_a_max_age: envVars.JWT_A_MAX_AGE,
  backendDomain: envVars.BACKEND_DOMAIN,
  sysDomain: envVars.SYSTEM_DOMAIN,
};

export default config