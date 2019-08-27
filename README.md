# Liri

LIRI is a Language Interpretation and Recognition Interface. A command line node app that takes in parameters and gives you back data.

1. LIRI displays your latest tweets
2. Show the following information about the song in your terminal/bash window
        *Artist(s)
        *The song's name
        *A preview link of the song from Spotify
        *The album that the song is from
3. Show the information about the movie in your terminal/bash
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
        * Rotten Tomatoes Rating.
        * Rotten Tomatoes URL.
4. LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands.

If no input is provided, it shows the details for predefined input value for movie and spotify-this.


Execution:

  npm install twitter
  
  npm install spotify
  
  npm install request

  node liri.js twitter  or node liri.js twitter user_input

  node liri.js movie  or node liri.js movie user_input
  
  node liri.js spotify-this  or node liri.js spotify-this user_input
  
  node liri.js do 
