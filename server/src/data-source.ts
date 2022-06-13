import "reflect-metadata"
import { DataSource } from "typeorm"
import Post from "./entity/post"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "pointrip.czzigxvcggcg.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "pointrip",
    password: "pointrip11",
    database: "pointrip3",
    synchronize: true,
    logging: true,
    entities: ["./build/**/*.entity.js"]
    //["src/entity/*.{js,ts}"],

})
