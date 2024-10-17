import express from "express";
import { DataSource } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client";
import { createBankerRouter } from "./routes/create_banker";
import { createClientRouter } from "./routes/create_client";
import { createTransactionRouter } from "./routes/create_transaction";
import { getClientRouter } from "./routes/get_client";

const app = express();
const main = async () => {
  try {
    const MysqlDataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "typeorm_learning",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    await MysqlDataSource.initialize();

    app.use(express.json());
    app.use(createClientRouter);
    app.use(getClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClientRouter);

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  } catch (error) {
    console.log("Connection error: ", error);
    throw new Error("Connection error");
  }
};

main();
