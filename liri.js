require("dotenv").config();
var fs = require('fs');
var keysJS = require("./keys.js");
var axios = require('axios');
var moment = require('moment');


var Spotify = require('node-spotify-api');
var spotify = new Spotify(keysJS.spotify);

var command = process.argv[2];
var itemToSearch = process.argv[3];

function help() {
    console.log("_______________________________________________________________________________________\nInstructions:\nTo use LIRI, type node liri.js and the 2 items at the command line you want to search: \nfor concert info, type", "\x1b[33m", "concert-this", "\x1b[0m", "followed by the artist you want to search.\nFor spotify info, type", "\x1b[33m", "spotify-this-song", "\x1b[0m", "followed by the song name. \nFor movie info, type", "\x1b[33m", "movie-this,", "\x1b[0m", "followed by the movie title.", "\x1b[33m", "\ndo-what-it-says", "\x1b[0m", "processes the output from an existing text file, random.txt. \nFor elements with more than 1 word in their name, surround the content in quotes.\nFor example - type this at the command line:", "\x1b[32m", "node liri.js movie-this \"Star Wars\"", "\x1b[0m", "\n_______________________________________________________________________________________")
};

function concert() {

    var concertURL = "https://rest.bandsintown.com/artists/" + itemToSearch + "/events?app_id=codingbootcamp";

    axios.get(concertURL)
        .then(function (response) {

            if (response.data.length < 1) {
                console.log("\nThere is no info for this artist. Please try another artist.");
            } else {
                console.log('\n');
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data[i].venue.name + ',' + ' ' + response.data[i].venue.city + ',' + ' ' + response.data[i].venue.region, moment(response.data[i].datetime).format("MM/DD/YYYY"))
                }
            };
        })
        .catch(function (error) {
            // error handling
            console.log('Artist not found. Please check your spelling or try another artist.');
        })
};

function song() {

    if (itemToSearch === undefined) {
        itemToSearch = "The Sign Ace of Base";
    };
    /* search only returns the 1st song found; the market option returns songs that are only available in the geographic region related to the user token provided by Spotify. 
     */
    spotify.search({
        type: 'track',
        limit: '1',
        market: 'from_token',
        query: itemToSearch
    }, function (err, data) {
        if (err) {
            return console.log('\nThere is no info for this song. Please try again.');
        };
        if (data.tracks.items[0].preview_url === null) {
            console.log('\nArtist:', data.tracks.items[0].album.artists[0].name, '\nSong title:', data.tracks.items[0].name, '\nSpotify preview link:', 'not available', '\nAlbum:', data.tracks.items[0].album.name);
        } else {
            console.log('\nArtist:', data.tracks.items[0].album.artists[0].name, '\nSong title:', data.tracks.items[0].name, '\nSpotify preview link:', data.tracks.items[0].preview_url, '\nAlbum:', data.tracks.items[0].album.name);
        };
    });

};

function movie() {

    var omdbURL = "https://www.omdbapi.com/?t=" + itemToSearch + "&y=&plot=short&apikey=trilogy";

    //condition if user did not pick a title
    if (itemToSearch === undefined) {
        axios.get('https://www.omdbapi.com/?t="Mr. Nobody"&y=&plot=short&apikey=trilogy')
            .then(function (response) {
                console.log('\nTitle:', response.data.Title, '\nYear:', response.data.Year, '\nIMDB Rating:', response.data.imdbRating, '\nRotten Tomatoes rating:', response.data.Ratings[1].Value, '\nCountry:', response.data.Country, '\nLanguage:', response.data.Language, '\nPlot:', response.data.Plot, '\nActors & Actresses:', response.data.Actors);
            })
            .catch(function (error) {
                // error handling
            });
    }
    axios.get(omdbURL)
        .then(function (response) {
            console.log('\nTitle:', response.data.Title, '\nYear:', response.data.Year, '\nIMDB Rating:', response.data.imdbRating, '\nRotten Tomatoes rating:', response.data.Ratings[1].Value, '\nCountry:', response.data.Country, '\nLanguage:', response.data.Language, '\nPlot:', response.data.Plot, '\nActors & Actresses:', response.data.Actors);
        })
        .catch(function (error) {
            // error handling
            console.log('\nMovie not found. Please check the title or try another title.');
        });

};

//reads data from random.txt file, preforms whatever search is specified.
function whatItSays() {

    fs.readFile('random.txt', 'utf8', function (error, data) {
        var randomTxtArray = data.split(',')
        command = randomTxtArray[0];
        itemToSearch = randomTxtArray[1];

        switchStatement();
    });
};

function switchStatement() {
    switch (command) {
        case 'concert-this':
            concert();
            break;

        case 'spotify-this-song':
            song();
            break;

        case 'movie-this':
            movie();
            break;

        case 'do-what-it-says':
            whatItSays();
            break;

        case 'help':
            help();
            break;

        default:
            console.log('Sorry, that input is invalid. Please enter a valid command. For help, type help at the command prompt.');
    }
};

switchStatement();