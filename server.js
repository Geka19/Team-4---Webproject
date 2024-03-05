const path = require("path");
const express = require("express");
//const ejs = require("ejs");

// initiate express app
const app = express();

// config express app
//app.use('/', express.static("public"));

app.use('/', (req, res)=>{
    res.end("hello there");
});

app.listen(8084, function () { console.log("Server is listening on port 8084") });
