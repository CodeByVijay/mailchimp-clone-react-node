import mysql from "mysql";
var mysqlCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "emailMarketing"
  });
  export default mysqlCon;


