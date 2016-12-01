// To execute 
//  npm install request
//  node liri.js argument

//install npm request before execution
var request = require("request");
var spotify = require('spotify');
var Twitter = require("twitter");
var fs = require("fs");
var keys = require("./keys.js");

// var keyload = keys.twitterKeys;

//operation to be selected by user
var operation = process.argv[2];

//input string by user
var user_input_string = process.argv;
var user_input = "";


for (var i = 3; i < user_input_string.length; i++) {
    user_input = user_input + " " + user_input_string[i];
}

user_input = user_input.trim();

//switch case to identify operation by user
switch (operation) {
    case "movie":
        movie();
        break;

    case "spotify-this":
        spot();
        break;


// ERROR 32 " Could not authenticate you" 
    case "twitter":
        //retrieve 20 tweets
        var client = new Twitter({
            consumer_key: keys.twitterKeys.consumer_key,
            consumer_secret: keys.twitterKeys.consumer_secret,
            access_token_key: keys.twitterKeys.access_token_key,
            access_token_secret: keys.twitterKeys.access_token_secret
        });

        console.log(client.consumer_key); //returns undefined
        // console.log(keys.twitterKeys);
        var input = { screen_name: 'ShwtaR' };
        client.get('statuses/user_timeline', input, function(error, tweets, response) {
            console.log(error);
            if (!error) {
                console.log(tweets);
            }
        });

        break;


    case "do":
        // Read the file
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

//function movie , feteches the data from omdb API 
function movie() {
    var queryUrl = "http://www.omdbapi.com/?tomatoes=true&t=" + user_input + "&y=&plot=short&r=json";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var title = JSON.parse(body).Title;
            console.log("Title: " + title);

            var year = JSON.parse(body).Year;
            console.log("Year : " + year);

            var iRate = JSON.parse(body).imdbRating;
            console.log("IMDB Rating: " + iRate);

            var country = JSON.parse(body).Country
            console.log("Country: " + country);

            var lang = JSON.parse(body).Language;
            console.log("Language: " + lang);

            var plot = JSON.parse(body).Plot;
            console.log("Plot: " + plot);

            var actor = JSON.parse(body).Actors;
            console.log("Actors " + actor);

            var rRate = JSON.parse(body).tomatoRating;
            console.log("Rotten-Tomatoes rating " + rRate);

            var url = JSON.parse(body).tomatoURL;
            console.log("Rotten-Tomato URL : " + url);
            console.log("----------------------------------------------------------------");

            fs.appendFile("log.txt", title + " | " + year + " | " + rRate + " | " + country + "\n");
        }
    });
}

//function spot, fetches data from spotify API
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

        fs.appendFile("log.txt", data.tracks.items[0].album.artists[0].name + " | " + data.tracks.items[0].name + " | " + data.tracks.items[0].album.name + " | " + data.tracks.items[0].album.artists[0].external_urls.spotify + "\n");
    });
}
