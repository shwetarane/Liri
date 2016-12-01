// To execute 
//  npm install request
//  node liri.js argument

//install npm request before execution
var request = require("request");
var spotify = require('spotify');
var twitter = require("twitter");
var fs = require("fs");
var keys = require("./keys.js");
var keyload = keys.twitterKeys;

var operation = process.argv[2];

var user_input_string = process.argv;
var user_input = "";
for (var i = 3; i < user_input_string.length; i++) {
    user_input = user_input + " " + user_input_string[i];
}

user_input = user_input.trim();


switch (operation) {
    case "movie":
        movie();
        break;

    case "spotify-this":
        spot();
        break;

    case "twitter":
        //retrieve 20 tweets
        break;


    case "do":
        // First I want to read the file
        fs.readFile('./random.txt', "utf8", function(err, data) {
            if (err) {
                throw err;
            }
            var content = data.split(",");

            operation = content[0];
             user_input = content[1];

            console.log(operation);
            console.log(user_input);

            if (operation === "movie") {
                //display movie details
               
                movie();
            } else if (operation === "spotify-this") {
                //display track details
                spot();
            }

        });
        break;

}


function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + user_input + "&y=&plot=short&r=json";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year : " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors " + JSON.parse(body).Actors);
            console.log("----------------");
        }
    })
    var queryTom = "http://www.omdbapi.com/?tomatoes=true&t=" + user_input + "&y=&plot=short&r=json";
    request(queryTom, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Rotten-Tomatoes rating " + JSON.parse(body).tomatoRating);
            console.log("Rotten-Tomato URL : " + JSON.parse(body).tomatoURL);
            console.log("----------------------------------------------------------------");
        }
    });
}


function spot() {
    spotify.search({ type: 'track', query: user_input }, function(err, data) {

        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name)
        console.log("A preview link of the song from Spotify: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("----------------------------------------------------------------------------------");
    });
}
