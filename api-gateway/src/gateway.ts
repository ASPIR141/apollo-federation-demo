import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

import {
    ENGINE_API_KEY,
    RESERVATIONS_SERVICE_URL,
    USERS_SERVICE_URL,
    PORT
} from './env';

const port = PORT || 4000;

const serviceList = [
    { name: 'Reservations', url: RESERVATIONS_SERVICE_URL },
    { name: 'Users', url: USERS_SERVICE_URL },
];

const gateway = new ApolloGateway({
    serviceList
});

const initializeServer = async () => {
    const { executor, schema } = await gateway.load();

    const server = new ApolloServer({
        executor,
        schema,
        engine: ENGINE_API_KEY && {
            apiKey: ENGINE_API_KEY,
        },
        playground: true
    });

    const { url } = await server.listen({ port });
    console.log(`🚀 Server started at ${url}`);
};

initializeServer();
