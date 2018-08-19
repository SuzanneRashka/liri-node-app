// get data from keys.js

require("dotenv").config();

var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var dotenv = require('dotenv');
var Spotify = require('node-spotify-api');
// var moment = requrire('moment');

var input = process.argv;
var command = process.argv[2];
var name = "";
// for loop to catch more than one word titles
for (i = 3; i < input.length; i++) {
    name = name + " " + input[i];
}

function getMeSpotify(songName) {
    let spotify = new Spotify(keys.spotify);

    if (!songName) {
        songName = "Which Way Will You Choose";
        console.log("You didn't make a selection, so Randy Travis will ask you repeatedly")
    }

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            output = space + "================= LIRI FOUND THIS FOR YOU...==================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
                space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
            console.log(output);

            fs.appendFile("log.txt", output, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        };
    });
}
getMeSpotify(command, input)
// if (command === 'spotify-this-song') {
//     var spotify = new Spotify(keys.spotify);

//     if (name === "") {
//         songName = "Which Way Will You Choose";
//         console.log("You didn't make a selection, so Randy Travis will ask you repeatedly")
//     } else {
//         spotify.search({
//             type: 'track',
//             query: songName,
//             limit: 2
//         }, function (err, data) {
//             if (err) {
//                 return err;
//             } else {
//                 console.log(data);
//             }
//         })
//     }
// }

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