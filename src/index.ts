import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";

const main = async () => {
  try {
    const MysqlDataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "typeorm_learning",
      entities: [Client, Banker],
      synchronize: true,
    });

    await MysqlDataSource.initialize();
  } catch (error) {
    console.log("Connection error: ", error);
    throw new Error("Connection error");
  }
};

main();
