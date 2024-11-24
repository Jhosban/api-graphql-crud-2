import { createConnection } from "typeorm";
import { Users } from "./Entities/userEntity";
import "./config"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./config";

// Conexion a la base de datos, y a las entidades.
export const connectDB = async () => {
  await createConnection({
    type: "mysql",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
    host: DB_HOST,
    database: DB_NAME,
    entities: [Users],
    synchronize: true,
    ssl: false,
  });
};
