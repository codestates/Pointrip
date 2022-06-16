import "reflect-metadata"
import { DataSource } from "typeorm"
import Post from "./entity/post"



export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "newfox11",
    database: "pointrip3",
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "/entity/*.ts"
    ],
    //["src/entity/*.{js,ts}"],
})
