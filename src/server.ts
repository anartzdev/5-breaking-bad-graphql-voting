import express from "express";
import compression from "compression";
import schema from "./schema";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import environments from "./config/environments";
import Database from "./config/database";
import { PubSub } from "graphql-subscriptions";
import { ConnectionContext, SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  const envs = environments;
  console.log(envs);
}

async function init() {
  const app = express();

  app.use(cors());

  app.use(compression());
  const httpServer = createServer(app);

  const database = new Database();
  const db = await database.init();

  const context: any = async () => {
    return { db };
  };

  

  const server = new ApolloServer({
    schema,
    context,
    introspection: true
  });

  

  await server.start();

  server.applyMiddleware({ app });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(connectionParams: object, webSocket: WebSocket, context: ConnectionContext) {
        console.log("Connected!");
      },
      onDisconnect( webSocket: WebSocket, context: ConnectionContext) {
        console.log("Disconnected!");
      },
    },
    { server: httpServer, path: server.graphqlPath }
  );

  app.get("/", (_, res) => {
    res.redirect("/graphql");
  });

  const PORT = process.env.PORT || 5300;

  httpServer.listen({ port: PORT }, () => {
    console.log(
      "====================================SERVER=============================="
    );
    console.log(
      `Votaciones Breaking Bad API GraphQL http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `Subscription Votaciones Breaking Bad API GraphQL ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

init();
