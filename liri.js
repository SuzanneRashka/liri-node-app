// get data from keys.js

require("dotenv").config();

var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var dotenv = require('dotenv');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// var moment = requrire('moment');

var userSelection = process.argv[2];
var mySong = process.argv[3];

if (userSelection === 'spotify-this-song' && mySong) {
    console.log("success");
    getSong();
}
// defaulting to "The Sign" by Ace of Base if no song is specified
// else if (userSelection === 'spotify-this-song' && mySong != true) {
//     console.log("failed");
//     spotify.search({
//         type: 'track',
//         query: 'The Sign'
//     }, function (err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }

//         console.log(JSON.stringify(data, null, 2));
//     });
// }

// function getSong() {
//     spotify.search({
//         type: 'track',
//         query: mySong
//     }, function (err, data) {
//         if (err) {
//             console.log(err);
//         }
//         console.log(JSON.stringify(data, null, 2));
//     });
// }

// omdb


var movie = "Alpha";
var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.omdb;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    createRow(response);
});



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

// songName = "Which Way Will You Choose";
//         console.log("You didn't make a selection, so Randy Travis will ask you repeatedly")