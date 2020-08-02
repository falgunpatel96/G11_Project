/* Author: Kethan Srinivas Dasari
   Banner Id:  B00842485
*/
const express = require("express");
const login_router = express.Router();
const { LoginController } = require("../controllers/LoginController");

login_router.post("/", (req, res) => {
    try {
        let userData = req.body.data;

        LoginController(userData, (response) => {
            let frontendResponse = {}

            if (response["code"] === "4") {
                frontendResponse["message"] = "User logged in successfully!";
                frontendResponse["userid"] = response["userDetails"]["userid"];
                frontendResponse["role"] = response["userDetails"]["role"]
                return res.status(200).send(frontendResponse);
            }
            else {
                frontendResponse["message"] = "User does not exists!";
                return res.status(403).send(frontendResponse);
            }
        });
    } catch (err) {
        console.log("err", err);
        return res.status(403).send("User not found");
    }
});

login_router.get("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

login_router.post("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

login_router.put("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

login_router.delete("*", (req, res) => {
    res
        .status(404)
        .send("OOPS something is wrong. We do not have the page requested.");
});

module.exports = login_router;
