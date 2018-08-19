// get data from keys.js

require("dotenv").config();

var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var dotenv = require('dotenv');
var spotify = require('node-spotify-api');
// var moment = requrire('moment');

spotify = new Spotify(keys.spotify);

console.log(spotify);


///  YET TO DO.....
// function concertThis(){}
// function movieThis(){}
// function DoWhatItSays(){}

// fs.readFile("random.txt", "utf8", function (err, data) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data); // loading from random.txt
//     // var dataArr = data.split(", ");
//     // console.log(dataArr);
// })