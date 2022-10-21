import { EnvType, load } from 'ts-dotenv';

const schema = {
    NODE_ENV: ['production' as const, 'development' as const, 'test' as const],
    PORT: Number,
    DATABASE_URL: String
};

type Env = EnvType<typeof schema>;

const env: Env = load(schema);

export default env;
