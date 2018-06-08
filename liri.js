var fs = require("fs")
var dotenv = require('dotenv').config()
var spotify = require("node-spotify-api");
var twitter = require("twitter");
var request = require("request")
var keys = require("./keys.js")

var nodeArg = process.argv
var operation = nodeArg[2];
var searchTerm = nodeArg.slice(3).join(" ")


switch (operation) {

    case "my-tweets":
        console.log("Searching...beep bop beep")
        client.displayTweets(searchTerm);
        break

    case "spotify-this-song":
        console.log("Searching...beep bop beep")
        spotifyClient.spotifySong(searchTerm);
        break

    case "movie-this":
        console.log("Searching...beep bop beep")
        Operate.searchMovie();
        break

    case "do-what-it-says":
        console.log("Searching...beep bop beep")
        Operate.randomSearch(searchTerm);
        break
}

var Operate = function () {
    this.displayTweets = function() {
        var client = new twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: keys.twitter.access_token_key,
            access_token_secret: keys.twitter.access_token_secret
        });
        var params = {
            screen_name: "Michell93372614", 
            count: 20,
            exclude_replies: true,
            tweet_mode: 'extended'
        }
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i = 1; i < tweets.length; i++) {
                    var myTweets = (
                            "\n===================================== " +
                            "\n" +
                            "\nTweeted on: " + tweets[i].created_at +
                            "\nTweet: " + tweets[i].text
                        )
                        console.log(myTweets);
                        console.log('\n-----------------------------------------');
                    }
            }
            else {
                console.log(error)  
            }

        });
        fs.appendFile("log.txt", myTweets, function(err) {
            if (err) throw err;
          });
    }
    this.spotifySong = function() {
        var spotify = new spotify({
            clientId: keys.spotify.id,
            clientSecret: keys.spotify.secret
        });
        if (searchTerm === "") {
            searchTerm = "Ultralight Beam"
        }
        spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var track = data.tracks.items
            for (var i = 0; i < track.length; i++) {
                var songLog = (
                        "\n===================================== " +
                        "\n" +
                        "\nArtists: " + track[i].artists[0].name +
                        "\nSong: " + track[i].name +
                        "\nSong Link: " + track[i].external_urls.spotify +
                        "\nAlbum: " + track[i].album.name +
                        "\n" +
                        "\n===================================== " +
                        "\n"
                    )
                    // print songLog to the screen
                console.log(songLog)
            }
        });
        fs.appendFile("log.txt", songLog, function(err) {
            if (err) throw err;
          });
    }
    
    this.searchMovie = function(searchTerm) {
        var URL =  "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy"

        if (searchTerm === "" ){
            searchTerm = "Mr. Nobody"
        }

        request(URL, function(error, response, body){
            var jsonData = JSON.parse(body);
            var movieLog = [
                "Title: " + jsonData.title,
                "Year: " + jsonData.year.join(", "),
                "IMDB Rating: " + jsonData.imdbRating,
                "Rotten Tomato Rating: " + jsonData.ratings[1].value,
                "Country: " + jsonData.country,
                "Language: " + jsonData.language,
                "Plot: " + jsonData.plot,
                "Actors: " + jsonData.actors
            ];
            console.log(movieLog);
        })

        fs.appendFile("log.txt", movieLog, function(err) {
            if (err) throw err;
          });
    }
    .this.randomSearch = function() { 
        fs.readFile("random.txt", "utf8", function(error, random) {
            if (error) {
                return console.log(error);
            }

            var randomArray = random.split(",");

            operation = randomArray[0]
            searchTerm = randomArray[1]
            Operate.spotifySearch()

        })
    }
}