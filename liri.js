var fs = require("fs")
var spotify = require("node-spotify-api");
var twitter = require("twitter");
var request = require("request")
var keys = require("./keys.js")

var nodeArg = process.argv
var operation = nodeArg[2];
var searchTerm = nodeArg.slice(3).join(" ")

var twitterClient = new twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});
var spotifyClient = new spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    // keys.spotify
});

var divider = "\n\n=====================================\n " 


displayTweets = function() {
    var params = {
        screen_name: "Michell93372614", 
        count: 20,
        exclude_replies: true,
        tweet_mode: 'extended'
    }
    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 1; i < tweets.length; i++) {
                var myTweets = (
                        "\nTweeted on: " + tweets[i].created_at +
                        "\nTweet: " + tweets[i].full_text + 
                        divider 
                    )
                    console.log(myTweets);
                }
                fs.appendFile("log.txt", myTweets, function(err) {
                    if (err) throw err;
                  });
        }
        else {
            console.log(error)  
        }

    });

}

spotifySong = function() {

    if (searchTerm === "") {
        searchTerm = "Ultralight Beam"
    }
    spotifyClient.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
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
            console.log(songLog)
            fs.appendFile("log.txt", songLog, function(err) {
                if (err) throw err;
              });
        }
    });

}

searchMovie = function() {
    var URL =  "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy"

    if (searchTerm === "" ){
        searchTerm = "How to Train Your Dragon";
    }

    request(URL, function(error, response, body){
        var jsonData = JSON.parse(body);
        var movieLog = [
            "Title: " + jsonData.Title,
            "Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.imdbRating,
            "Rotten Tomato Rating: " +jsonData.Ratings[1].Value,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors, 
            "====================================="
        ];
        console.log(movieLog);
        fs.appendFile("log.txt", movieLog, function(err) {
            if (err) throw err;
          });
    })

};
randomSearch = function() { 
    fs.readFile("random.txt", "utf8", function(error, random) {
        if (error) {
            return console.log(error);
        }
        var randomArray = random.split(",");

        operation = randomArray[0]
        searchTerm = randomArray[1]
        spotifySong()

    })
}


switch (operation) {

    case "my-tweets":
        console.log("\nSearching...beep bop beep" + divider )
        displayTweets();
        break

    case "spotify-this-song":
        console.log("\nSearching...beep bop beep"+ divider )
        spotifySong();
        break

    case "movie-this":
        console.log("\nSearching...beep bop beep"+ divider )
        searchMovie();
        break

    case "do-what-it-says":
        console.log("\nSearching...beep bop beep"+ divider )
        randomSearch();
        break
}