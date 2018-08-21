// get data from keys.js

require("dotenv").config();


var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var dotenv = require('dotenv');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// var moment = requrire('moment');

var command = process.argv[2];

// The parameter to the LIRI command may contain spaces
// ?????????

// Kick off the right function... 
if (command === 'spotify-this-song') {
    console.log('getting your song...')
    getSong();
} else if (command === 'movie-this') {
    console.log('getting your movie....')
    getMovie();
} else if (command === 'concert-this') {
    console.log('getting your concert....')
    getConcert();
} else {
    console.log('end')
}


// SPOTIFY ********************************************

function getSong() {
    var songName = process.argv[3];
    // default to The Sign if empty
    if (songName === '') {
        console.log("failed");
        spotify.search({
            type: 'track',
            query: 'The Sign'
        }, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log('Getting song inside..')
            console.log(data);
        })
        spotify.search({
            type: 'track',
            query: songName
        }, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(data, null, 2));
        });


    } // end if stmt
} // end getSong



// OMDB ********************************************

function getMovie() {

    var movieName = process.argv[3];
    var queryURL = "https://www.omdbapi.com/?apikey=" + keys.omdb.key + "&t=" + movieName + "&plot=full";

    if (!movieName) {
        movieName = "mr nobody";
    } else {
        request(queryURL, function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                var data = JSON.parse(body);
                console.log(
                    "\n" + "********** Your Movie Information **********\n" +
                    "Title: " + data.Title + "\n" +
                    "Release Year: " + data.Year + "\n" +
                    "IMDB Rating: " + data.imdbRating + "\n" +
                    // "Rotten Tomatoes Rating: " + data.Ratings[0].Value + "\n" +
                    "Country: " + data.Country + "\n" +
                    "Language: " + data.Language + "\n" +
                    "Plot: " + data.Plot + "\n" +
                    "Actors: " + data.Actors + "\n" +
                    "********************************************"
                );
            }
        })
    }
}


// BANDS ********************************************

function getConcert() {
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.concert.id
    if (command === 'concert-this') {
        console.log('concert requested...')
        request(queryURL, function (err, response, body) {
            var parsedBody = JSON.parse(body);
            console.log(parsedBody)
        })


    }
}


// function DoWhatItSays(){}
// ^^^^
// fs.readFile("random.txt", "utf8", function (err, data) {
//     if (err) {
//         console.log(err);
//     }
// console.log(data); // loading from random.txt
// var dataArr = data.split(", ");
// console.log(dataArr);
// })

// invoker


///  YET TO DO.....
// spotify not working
// default movie not working
// not taking more than one word
// concert this
// do as i say