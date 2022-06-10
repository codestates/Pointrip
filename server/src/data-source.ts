import "reflect-metadata"
import { DataSource } from "typeorm"
import Post from "./entity/post"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "newfox11",
    database: "pointrip2",
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.{js,ts}"],

})

