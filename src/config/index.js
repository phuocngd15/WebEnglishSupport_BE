import { merge } from 'lodash';
const env = process.env.NODE_ENV || 'development';
// set up env
const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 9999,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '1d'
  }
};
let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config;
    break;
  case 'test':
  case 'testing':
    envConfig = require('./test').config;
    break;
  default:
    envConfig = require('./dev').config;
}
export default merge(baseConfig, envConfig);
