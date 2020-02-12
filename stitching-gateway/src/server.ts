import { ApolloServer } from 'apollo-server';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryLRUCache } from 'apollo-server-caching';
import {
    introspectSchema,
    makeRemoteExecutableSchema,
    mergeSchemas
} from 'graphql-tools';
import fetch from 'node-fetch';

import {
    ENGINE_API_KEY,
    RESERVATIONS_SERVICE_URL,
    USERS_SERVICE_URL,
    PORT
} from './env';

const port = PORT || 4000;

const serviceList = [
    { uri: RESERVATIONS_SERVICE_URL },
    { uri: USERS_SERVICE_URL },
];

const createRemoteExecutableSchemas = async () => {
    let schemas = [];
    for (const api of serviceList) {
        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ locations, message, path }) => {
                    console.log(`[GraphQL error]: Message: ${message}, Location ${locations}, Path: ${path}`)
                })
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`)
            }
        });

        const httpLink = new HttpLink({
            uri: api.uri,
            fetch
        });

        const contextLink = setContext((request, previousContext) => {
            return {
                headers: {
                    'Authentication': `${previousContext.graphqlContext.oid}`,
                }
            }
        });

        const remoteSchema = await introspectSchema(httpLink);
        const remoteExecutableSchema = makeRemoteExecutableSchema({
            schema: remoteSchema,
            link: ApolloLink.from([contextLink, errorLink, httpLink])
        });
        schemas.push(remoteExecutableSchema);
    }
    return schemas;
};

const createNewSchema = async () => {
    const schemas = await createRemoteExecutableSchemas();
    return mergeSchemas({
        schemas
    });
};

const initializeServer = async () => {
    const schema = await createNewSchema();

    const server = new ApolloServer({
        cache: new InMemoryLRUCache(),
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
