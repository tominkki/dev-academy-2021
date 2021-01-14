import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Name {
    name: String!
    amount: Int!
  }

  type Query {
    totalAmount: Int!
    names(alphabetical: Boolean, name: String): [Name!]! 
  }
`;

export default typeDefs;
