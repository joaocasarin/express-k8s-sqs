import morgan, { StreamOptions } from 'morgan';
import env from './env';
import Logger from './logger';

const stream: StreamOptions = {
    write: (message: string) => Logger.http(message)
};

const skip = () => {
    const nodeEnv = env.NODE_ENV || 'development';
    return nodeEnv !== 'development';
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
);

export default morganMiddleware;
