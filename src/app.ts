import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";

// Creacion del servidor web
const app = express();

// Configuracion del servidor
app.use("/graphql",graphqlHTTP({
    graphiql: true,
    schema,
  })
);

export default app;
