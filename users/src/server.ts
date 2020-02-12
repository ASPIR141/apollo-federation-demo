import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { PORT } from './env';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const port = PORT || 4002;

const server = new ApolloServer({
    schema: buildFederatedSchema([
        {
            typeDefs,
            resolvers,
        },
    ]),
});

server.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});