import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Issue } from "./entities/Issue"
import { Image_File_Paths } from "./entities/Image_file_paths"
import { AI_Insight } from "./entities/AI_insight"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "pipeline",
    synchronize: true,
    logging: true,
    entities: [User, Issue, Image_File_Paths, AI_Insight],
    subscribers: [],
    migrations: [],
})