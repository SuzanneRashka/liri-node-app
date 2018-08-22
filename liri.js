// get data from keys.js

require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var dotenv = require("dotenv");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require('moment');

var command = process.argv[2];
// The parameter to the LIRI command may contain spaces
var input = process.argv.slice(3).join(" ");


// SPOTIFY ********************************************
var getArtistNames = function (artist) {
    return artist.name;
};
var getSong = function (songName) {
    var songName = process.argv[3];
    // default to The Sign if empty
    if (songName === undefined) {
        songName = "The Sign";
    }

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var song = data.tracks.items;
        console.log("********** Your Song Information **********\n")
        for (var i = 0; i < song.length; i++) {
            console.log("\n" + i +
                // "********** Your Song Information **********\n\n" +
                "Artist         : " + song[i].artists.map(getArtistNames) + "\n" +
                "Song Name      : " + song[i].name + "\n" +
                "Preview Song   : " + song[i].preview_url + "\n" +
                "Album          :" + song[i].album.name + "\n" +
                "********************************************");

        } // end for loop
    }); // end spotify.search
}; // end getSong function

// OMDB ********************************************

function getMovie() {
    var movieName = process.argv.slice(3).join(" ");
    if (!movieName) {
        movieName = "mr nobody";
        console.log("wtf")
    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    request(queryURL, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            var data = JSON.parse(body);
            console.log(
                "\n" +
                "********** Your Movie Information **********\n\n" +
                "Title                    : " + data.Title + "\n" +
                "Release Year             : " + data.Year + "\n" +
                "IMDB Rating              : " + data.imdbRating + "\n" +
                "Rotten Tomatoes Rating   : " + data.Ratings[0].Value + "\n" +
                "Country                  : " + data.Country + "\n" +
                "Language                 : " + data.Language + "\n" +
                "Actors                   : " + data.Actors + "\n" +
                "Plot                     : " + data.Plot + "\n\n" +
                "********************************************"
            );
        }
    });

}

// CONCERTS ********************************************

function getConcert() {
    var artist = process.argv.slice(3).join(" ").trim();
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    request(queryURL, function (error, response, body) {
        if (!artist) {
            console.log("Please add an artist!")
        }
        if (error) return console.console.log(error);
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            console.log("********** Your Concert Information **********")
            for (var i = 0; i < 3; i++) {
                console.log("\n" +
                    "Venue         : " + data[i].venue.name + "\n" +
                    "Location      : " + data[i].venue.city + ", " + data[i].venue.country + "\n" +
                    "Date          : " + moment(data[i].datetime, 'YYYY-MM-DD').format('MM/DD/YYYY') + "\n"
                );
            };
            console.log("********************************************")
        };
    });
};

// DO AS I SAY ********************************************

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            doWhatItSaysResults = data.split(",");
            getSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};


// invoke this!
switch (command) {
    case "concert-this":
        getConcert();
        break;
    case "spotify-this-song":
        getSong();
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
};