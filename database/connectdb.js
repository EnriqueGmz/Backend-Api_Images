import mysql from "mysql";

const mysqlConnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
})

mysqlConnect.connect(function (err) {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Database is connect 👋")
    }
})

export default mysqlConnect;