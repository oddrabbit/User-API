const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());

var User_model = mongoose.model("User", new mongoose.Schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String
}));

mongoose.connect("mongodb://127.0.0.1:27017/users");

app.get("/api/listusers", async function (req, res) {
    console.log("Received GET method on " + req.url);
    res.set({"Content-Type" : "application/json"});
    var user_object = await User_model.find(req.body).select("-_id firstname lastname username password");
    if (user_object.length !== 0){
        res.write(JSON.stringify(user_object));
    }
    res.end();
});

app.post("/api/addusers", function (req, res) {
    console.log("Received POST method on " + req.url + ":");
    console.log(req.body)
    res.set({"Content-Type" : "application/json"});
    var user_object = new User_model(req.body);
    user_object.save(function (err, user) {
        if (err) {
            res.write(JSON.stringify({"status" : "failed"}));
            res.end();
        } else {
            res.write(JSON.stringify({"status" : "success"}));
            res.end();
        }
    });

});

app.patch("/api/patch", function (req, res) {
    console.log("Received PATCH method on " + req.url);
    res.set({"Content-Type" : "application/json"});
});

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Running on: http://" + host + ":" + port);
});
