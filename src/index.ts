import { DataSource } from "typeorm";

const main = async () => {
  try {
    const MysqlDataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "test",
      password: "",
      database: "typeorm_learning",
      entities: [
        // ....
      ],
    });

    console.log(MysqlDataSource.manager.find);
  } catch (error) {
    console.log("Connection error: ", error);
    throw new Error("Connection error");
  }
};

main();
