// To execute 
//  npm install request
//  node liri.js argument

//install npm request before execution
var request = require("request");
var $ = require('jQuery');
var spotify = require('spotify');
var twitter = require("twitter");
var fs = require("fs");

var keys = require("./keys.js");
var keyload = keys.twitterKeys;

var operation = process.argv[2];



switch (operation) {
    case "movie-this":
        // var movie = process.argv;
        // var movie_name = "";
        // for (var i = 3; i < movie.length; i++) {
        //     movie_name = movie_name + " " + movie[i];
        // }

        var movie_name = process.argv[3];
        var queryUrl = "http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&r=json";

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
        var queryTom = "http://www.omdbapi.com/?tomatoes=true&t=" + movie_name + "&y=&plot=short&r=json";
        request(queryTom, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Rotten-Tomatoes rating " + JSON.parse(body).tomatoRating);
                console.log("Rotten-Tomato URL : " + JSON.parse(body).tomatoURL);
                console.log("----------------------------------------------------------------");
            }
        });
        break;

    case "spotify-this-song":
        // var song_name = process.argv;
        // for(var i = 3; i < song_name.length; i++){
        //     var song = song_name + " " + song_name[i];
        // }
        // console.log("Song "+song);

        var song = process.argv[3];

  
        spotify.search({ type: 'track', query: song }, function(err, data) {

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


        break;

    case "twitter":
        // var twitter_url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
        // console.log(twitter_url);

        // var params = { screen_name: 'nodejs' };
        // client.get('statuses/user_timeline', params, function(error, tweets, response) {
        //     if (!error) {
        //         console.log(tweets);
        //     }
        //     console.log(tweets);
        //     console.log(response);
        // });
        break;


    case "do":
        // First I want to read the file
        fs.readFile('./random.txt', "utf8", function(err, data) {
            if (err) {
                throw err;
            }
            var content = data;
            console.log(content);
        });
        break;


}
