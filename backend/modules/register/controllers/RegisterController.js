/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const mysql = require("mysql");
const config = require("../../../config");

let database = mysql.createConnection({
    host: config.mySQLConfig.host,
    user: config.mySQLConfig.user,
    password: config.mySQLConfig.password,
    port: config.mySQLConfig.port,
});

let connect_query = "use " + config.mySQLConfig.database;

database.connect(function (error) {
    if (error) {
        throw error;
    }
    database.query(connect_query, function (error, result) {
        if (error) {
            throw error;
        }
        console.log("DB connected");
    });
});

const RegisterController = (userData, response) => {
    console.log(userData);

    let username = userData.name;
    let email = userData.email;
    let password = userData.password;

    let create_user_query = `INSERT INTO User(userName, email, password) values ('${username}', '${email}', 
              '${password}');`;

    database.query(create_user_query, function (error, result) {
        if (error) {
            console.log(error);
        }
        console.log("User created successfully");
    });
}


module.exports.RegisterController = RegisterController;
