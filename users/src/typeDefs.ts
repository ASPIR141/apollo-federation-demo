import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    user(id: ID!): User
  }

  type User @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
    address: String
  }

  extend type Reservation @key(fields: "id") {
    id: ID! @external
    userId: ID! @external
    user: User @requires(fields: "userId")
  }
`;

export default typeDefs;
