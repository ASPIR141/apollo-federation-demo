import { gql } from 'apollo-server';

/**
 * @key directive tells other services which fields to use to uniquely identify a particular instance of the type.
 */

const typeDefs = gql`
  type Query {
    reservations: [Reservation]!
    reservation(id: ID!): Reservation
  }

  type Reservation @key(fields: "id") {
    id: ID!
    userId: ID!
    reservationDate: String!
    status: String
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    reservations: [Reservation]
  }
`;

export default typeDefs;
