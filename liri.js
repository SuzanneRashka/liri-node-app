// get data from keys.js

require("dotenv").config();

var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var dotenv = require('dotenv');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// var moment = requrire('moment');

var cmdArgs = process.argv;
var command = cmdArgs[2];

// The parameter to the LIRI command may contain spaces
var liriArg = '';
for (var i = 3; i < cmdArgs.length; i++) {
    liriArg += cmdArgs[i] + ' ';
}

// var command = process.argv[2];
// var mySong = process.argv[3];

// if (command === 'spotify-this-song') {
//     console.log("success");
//     getMovie
// }
// defaulting to "The Sign" by Ace of Base if no song is specified
// else if (command === 'spotify-this-song' && mySong != true) {
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
// var movieThis = process.argv[2];



function getMovie() {

    var movieName = process.argv[3];
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.key;
    if (!movieName) {
        movieName = "mr nobody"
    }
    request(queryURL, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            // console.log(response);
            var data = JSON.parse(body);
            console.log(
                "\n" + "********** Your Movie Information **********\n" +
                "Title: " + data.Title + "\n" +
                "Release Year: " + data.Year + "\n" +
                "IMDB Rating: " + data.imdbRating + "\n" +
                "Rotten Tomatoes Rating: " + data.Ratings[0].Value + "\n" +
                "Country: " + data.Country + "\n" +
                "Language: " + data.Language + "\n" +
                "Plot: " + data.Plot + "\n" +
                "Actors: " + data.Actors + "\n" +
                "********************************************"
            );
        }
    })
}


///  YET TO DO.....
// function concertThis(){}
// function movieThis(){}

// function DoWhatItSays(){}
// ^^^^
// fs.readFile("random.txt", "utf8", function (err, data) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data); // loading from random.txt
//     // var dataArr = data.split(", ");
//     // console.log(dataArr);
// })

// invoker

switch (command) {
    case "movie-this":
        getMovie();
        break;
        // case "spotify-this-song": getSong(); break;
        // case "concert-this": getConcert(); break;
        // case "do-what-it-says": doIt(); break;
    default:
        console.log("retype your input to properly search.")

}