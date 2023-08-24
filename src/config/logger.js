import winston, { transports } from 'winston';
import config from "./config.js";

// Logger custom levels
const customLevelOptions = {
  levels: {
    fatal: 1,
    error: 2,
    warning: 3,
    info: 4,
    http: 5,
    debug: 6
  },
  colors: {
    fatal: 'black',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'gray',
    debug: 'white'
  }
};

// Dev Logger
const devLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      )
    })
  ]
});

// Prod Logger
const prodLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: './errors.log', level: 'error' })
  ]
});

export const getLogger =  () => {
  if (config.environment === 'production') {
    return prodLogger;
  } else {
    return devLogger;
  }
};
