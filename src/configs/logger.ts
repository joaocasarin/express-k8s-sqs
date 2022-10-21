import winston from 'winston';
import env from '@configs/env';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = () => {
    const nodeEnv = env.NODE_ENV || 'development';
    const isDevelopment = nodeEnv === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const silent = env.NODE_ENV === 'test';

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({ all: true })),
        silent
    }),
    new winston.transports.File({
        level: 'error',
        filename: 'dist/logs/error.log',
        silent
    }),
    new winston.transports.File({
        level: 'warn',
        filename: 'dist/logs/warn.log',
        silent
    }),
    new winston.transports.File({
        level: 'info',
        filename: 'dist/logs/info.log',
        silent
    }),
    new winston.transports.File({
        level: 'http',
        filename: 'dist/logs/http.log',
        silent
    }),
    new winston.transports.File({
        level: 'debug',
        filename: 'dist/logs/debug.log',
        silent
    })
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

export default Logger;
