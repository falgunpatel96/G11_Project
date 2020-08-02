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

const LoginController = (userData, response) => {
    let email = userData.email;
    let password = userData.password;

    let select_user_query = `SELECT userid, userName, role from webproject.User where email='${email}' and password='${password}'`;

    database.query(select_user_query, function (error, result) {
        userDetails = {};
        responseDetails = {};
        if (error) {
            responseDetails["code"] = "1";
            responseDetails["userDetails"] = {};
            response(responseDetails);

            throw error;
        }

        result = JSON.parse(JSON.stringify(result))
        if (result.length === 0) {
            responseDetails["code"] = "1";
            responseDetails["userDetails"] = {};
            response(responseDetails);
        } else {
            responseDetails["code"] = "4";
            responseDetails["userDetails"] = result[0];
            response(responseDetails);
        }

        console.log(result);

        console.log("User logged in successfully");
    });
}


module.exports.LoginController = LoginController;
