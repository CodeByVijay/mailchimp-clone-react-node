import { Sequelize } from "sequelize";
import mysql from "mysql";
const db = new Sequelize('emailMarketing', 'root', '12345', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;

