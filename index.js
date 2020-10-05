//Config express server
const express = require('express');
var bodyParser = require("body-parser");
var method_override = require("method-override");
var http = require("http");
const app = express();
const port = 4000;

//server
var server = http.Server(app);

//route
var route = require('./router.js');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(method_override("_method"));

//express-route
app.use('/', route);

server.listen(port,function(){

});