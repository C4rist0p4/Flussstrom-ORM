import "reflect-metadata";
import {
  ConnectionOptions,
  Connection,
  createConnection,
  getConnection
} from "typeorm";

export const config: ConnectionOptions = {
  name: "database",
  type: "mariadb",
  host: "local",
  port: 3306,
  username: "admin", // review
  password: "123456789", // review
  database: "database",
  synchronize: false,
  logging: true,
  entities: ["lib/entity/**/*.js"]
};

export const connect = async () => {
  let connection: Connection;

  try {
    connection = getConnection(config.name);
    console.log(connection);
  } catch (err) {
    connection = await createConnection(config);
  }

  return connection;
};
