import { gql, ApolloServer } from "apollo-server-lambda";

const IS_LOCAL = !!process.env.IS_LOCAL;

const typeDefs = gql`
enum TicketMode {
METRO,
BUS,
ALL
}

type TicketType {
code: String
name: String!
description: String!
cost: Float!
expires: Int!
appliesTo: TicketMode!
}

type Ticket {
accountId: String!
ticketId: String
ticketType: TicketType
startDate: String!
endDate: String!
cost: Float!
createdAt: String!
}

type Query {
hello: String
my_tickets: [Ticket]
}
`;

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    'my_tickets': async (root: any, args: { sortDirection: "ASC" | "DESC" }, ctx: any) => {
      console.log({root, args, ctx})
      return Promise.resolve([{ticketId: 'id', ticketType: {code: 'code'}}])
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: IS_LOCAL,
});

export const handler = server.createHandler();
