// get data from keys.js


var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var spotify = require('node-spotify-api');
// var moment = requrire('moment');

require("dotenv").config();

//holder for argument
var input = process.argv;
// Need to figure out how to take multiple words for one entry ****

var command = input[2]
var songName = "";

if (command === "spotify-this-song") {

    var spotify = new Spotify(keys.spotify);
    // Catch errs..
    if (!songName) {
        // If no song is provided then your program will default to "Which way will you choose" by Randy Travis. haha***
        songName = "Which Way Will You Choose";
        console.log("You didn't make a selection, so Randy Travis will ask you repeatedly")
    } else {
        spotify.search({
            type: 'track',
            query: 'name',
            limit: 5
        }, function (err, data) {
            if (err) {
                return 'Error occured : ' + err;
            }
            console.log(data);
            // var link = data.link
            var track = data.tracks.items[5];
            var selectedSong = "************************" + "\n" +
                "Artist: " + name + "\n" +
                "Song Name: " + track.artist[0].name + "\n" +
                "Link : " +
                ""

            "************************"


        })
    }
}


// else {
//     fs.readFile("random.txt", "utf8", function (err, data) {
//         if (err) {
//             console.log(err);
//         }
//         console.log(data); // loading from random.txt
//         // var dataArr = data.split(", ");
//         // console.log(dataArr);
//     })
// }


///  YET TO DO.....
// function concertThis(){}
// function movieThis(){}
// function DoWhatItSays(){}