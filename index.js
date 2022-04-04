const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type Movie {
        title: String
    }

`;
const driver = neo4j.driver(
    "neo4j://34.126.112.247:7687",
    neo4j.auth.basic("neo4j", "neo4jifggcp")
);
const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
      schema,
  });

  server.listen(4000).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
  });
})
