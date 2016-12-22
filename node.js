// This file does entire backEnd handling of the code . 
"use strict";

// declarig and importing node and  express modules for various tasks 
var nodemailer = require('nodemailer');  // module for sending mail
var express = require('express');  // module for express library
var app = express(); 
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var path = require("path"); // module for mongodb
var mongo = require("mongodb"),
    fs = require("fs"),         // to read static files
    http = require("http");
var bodyParser = require("body-parser");  // module for text parsing



//twitter module
var Twitter = require('twitter');
 
//For parsing JSON files
app.use(bodyParser());

//for access allow
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//twitter client connection 
var client = new Twitter({
  consumer_key: 'K7tJZQ2SrSIcMcO5p51HGvHRw',
  consumer_secret: 'nBRbx9IriVQOGLuTAHIaEBi7FC5PaTdDik2o2zZpU6yp2jO4G6',
  access_token_key: '783782162-JByipyMduXA5eLpkyfxpZih4UtTkG3EPIJfHDXIN',
  access_token_secret: 'ePSTCiEHe4RXVvHLW3K1b1jcnHx02JBMldukNAmLFsZem'
});

// fetching tweets
app.get('/tweets', function(req, res){
client.get('favorites/list', function(error, tweets, response) {
  
  for ( var i = 0 ; i < tweets.length ; i++ ) {

    console.log(tweets[i].id);
    console.log(tweets[i].text);
  }
   var pageData = "[";
       for (var i = 0; i < tweets.length ; i++ ) {
          pageData = pageData +  JSON.stringify(tweets[i]) + ',';
        }
        pageData = pageData.substr(0, pageData.length - 1)
        pageData = pageData + ']';
      
       res.end( pageData ); 
  });
})

//fetching statuses
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
   // console.log(tweets);
  }
});


var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
//  console.log(event && event.text);
});
 



// creating server
var server = app.listen(3000, function () {
  var host = server.address().address
  console.log(host)
  var port = server.address().port
  console.log("app listening at http://@%s:%s", host, port);
});

//html routing
app.get('/', function(req, res){
    res.sendFile(__dirname + '/users.html');
});
 


//for login credential checkup 
app.post('/login', function (req, res) { 
    console.log(req.body["emailId"])
    // make a check of whatever login credential we want to do
});

//mysql queries 
var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'shishir',  
  password : 'shishir',  
  database : 'test'  
});  

connection.connect(); 


//can do whatever query we want to do in same way
app.post('/query', function (req, res) { 
  console.log(req.body["field"]);
  connection.query('SELECT ' +  req.body["field"] + " FROM " + req.body["table"], function(err, rows, fields)   
    {  
      if (err) throw err;  
      console.log(rows[0]);  
  });  
})














