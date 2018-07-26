

require('dotenv').config();

var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");


//Arguments Array
var command = process.argv[2];


//switch case
switch (command) {
    case "my-tweets":
        showTweets();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doit();
        break;



}

function showTweets() {
    var client = new Twitter(keys.twitter);

    //Display last 20 Tweets
    var screenName = { screen_name: "JosephE66122878" };
    client.get('statuses/user_timeline', screenName, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@JosephE66122878  " + tweets[i].text + " Created at: " + date.substring(0, 19));
                console.log("-----------------------");

            }
        } else {
            console.log('Error occurred');
        }
    });
}

function spotify() {
    var spotify = new Spotify(keys.spotify);

    var search = process.argv[3];

    if (search == null) {
        search = "The Sign Ace of Base";
    } else {
        song = search;
    }

    spotify.search({ type: 'track', query: search + '&limit=1&' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("---------------------------------------------------");
            console.log(" ");
            console.log("The song you entered was " + search + ".");
            console.log(" ");
            console.log("Here is the infromation you requested!");
            console.log(" ");
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log(" ");
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log(" ");
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log(" ");
            console.log("---------------------------------------------------");
        }


    });
}

function movie() {
    var request = require("request");

    var movie = process.argv[3];
    if (movie == null) {
        movie = "mr nobody";
    }

    request('https://www.omdbapi.com/?t=' + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        jsonBody = JSON.parse(body)
        if (error) {

            console.log('error:', error);

        } else {
            console.log("---------------------------------------------------");
            console.log(" ");
            console.log("Title of the movie: "+jsonBody.Title);
            console.log(" ");
            console.log("Year Released: "+jsonBody.Year);
            console.log(" ");
            console.log("IMDB Rating: "+jsonBody.imdbRating); 
            console.log(" ");
            console.log("Rotten Tomato Rating: " + jsonBody.Ratings[1].Value)
            console.log(" ");
            console.log("Country where the movie was produced: "+jsonBody.Country);
            console.log(" ");
            console.log("Language of the movie: "+jsonBody.Language);
            console.log(" ");
            console.log("Plot of the movie: "+ jsonBody.Plot);
            console.log(" ");
            console.log("Starring : "+jsonBody.Actors);
            console.log(" ");
            console.log("---------------------------------------------------");

        }


    });
}


    function doit() {
        fs.readFile('./random.txt', "utf8", function(error, data){
    
            if (error) {
               return console.log(error);
             }
    
            
            var dataArr = data.split(",");
    
            
            if (dataArr[0] === "spotify-this-song") {
                var songcheck = dataArr[1].slice(1, -1);
                spotify(songcheck);
            } else if (dataArr[0] === "my-tweets") {
                var tweetname = dataArr[1].slice(1, -1);
                twitter(tweetname);
            } else if(dataArr[0] === "movie-this") {
                var movie_name = dataArr[1].slice(1, -1);
                movie(movie_name);
            } 
            
         });

        };
