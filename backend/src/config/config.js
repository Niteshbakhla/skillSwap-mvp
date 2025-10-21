import { config } from "dotenv";
config();

const isProduction = process.env.NODE_ENV === 'production';

const _config = {
            JWT_SECRET: process.env.JWT_SECRET,
            NODE_ENV: process.env.NODE_ENV,
            COOKIE_SECURE: isProduction,
}

export default Object.freeze(_config);