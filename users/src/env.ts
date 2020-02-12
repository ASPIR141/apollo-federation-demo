import { evalObject } from './util';

export const {
    ENGINE_API_KEY,
    PORT,
    RESERVATIONS_SERVICE_URL,
    USERS_SERVICE_URL
} = evalObject<NodeJS.ProcessEnv>(process.env);
