require("dotenv").config();
var fs = require('fs');

var keysJS = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');

var spotify = new Spotify(keysJS.spotify);

var command = process.argv[2];
var itemToSearch = process.argv[3];

function help() {
    console.log("_______________________________________________________________________________________\nInstructions:\nTo use LIRI, type node liri.js and the 2 items at the command line you want to search: \nfor concert info, type", "\x1b[33m", "concert-this", "\x1b[0m", "followed by the artist you want to search.\nFor spotify info, type", "\x1b[33m", "spotify-this-song", "\x1b[0m", "followed by the song name. \nFor movie info, type", "\x1b[33m", "movie-this,", "\x1b[0m", "followed by the movie title.", "\x1b[33m", "\ndo-what-it-says", "\x1b[0m", "processes the output from an existing text file, random.txt. \nFor elements with more than 1 word in their name, surround the content in quotes.\nFor example - type this at the command line:", "\x1b[32m", "node liri.js movie-this \"Star Wars\"", "\x1b[0m", "\n_______________________________________________________________________________________")
};

function concert() {
    // console.log('concert-this');

    var concertURL = "https://rest.bandsintown.com/artists/" + itemToSearch + "/events?app_id=codingbootcamp";

    request(concertURL, function (error, response, body) {
        if (error) {
            return console.log('its false!')
        }
        body = JSON.parse(body);
        //error detection - THIS DOES NOT WORK
        if (body.length < 1) {
            console.log("\nThere is no info for this band. Please try another band.");
        } else {
            console.log('\n');
            for (let i = 0; i < body.length; i++) {
                console.log(body[i].venue.name + ',' + ' ' + body[i].venue.city + ',' + ' ' + body[i].venue.region, moment(body[i].datetime).format("MM/DD/YYYY"))
            };
        };
    });
};

function song() {

    if (itemToSearch === undefined) {
        itemToSearch = "The Sign Ace of Base";
    };
    spotify.search({
        type: 'track',
        limit: '1',
        market: 'from_token',
        query: itemToSearch
    }, function (err, data) {
        if (err) {
            return console.log('\nSpotify could not find data for that selection. Please try again.');
        };
        if (data.tracks.items[0].preview_url === null) {
            console.log('\nArtist:', data.tracks.items[0].album.artists[0].name, '\nSong title:', data.tracks.items[0].name, '\nSpotify preview link:', 'not available', '\nAlbum:', data.tracks.items[0].album.name);
        } else {
            console.log('\nArtist:', data.tracks.items[0].album.artists[0].name, '\nSong title:', data.tracks.items[0].name, '\nSpotify preview link: (CTRL-click/CMD-click', data.tracks.items[0].preview_url, '\nAlbum:', data.tracks.items[0].album.name);
        };
    });

};

function movie() {

    var omdbURL = "https://www.omdbapi.com/?t=" + itemToSearch + "&y=&plot=short&apikey=trilogy";

    //condition if user does not pick a movie title. Defaults to Mr. Nobody
    if (itemToSearch === undefined) {
        request('https://www.omdbapi.com/?t="Mr. Nobody"&y=&plot=short&apikey=trilogy', function (error, response, body) {
            body = JSON.parse(body);
            console.log('\nTitle:', body.Title, '\nYear:', body.Year, '\nIMDB Rating:', body.imdbRating, '\nRotten Tomatoes rating:', body.Ratings[1].Value, '\nCountry:', body.Country, '\nLanguage:', body.Language, '\nPlot:', body.Plot, '\nActors & Actresses:', body.Actors);
        });
    } else {
        request(omdbURL, function (error, response, body) {

            body = JSON.parse(body);

            /* error checking - if user enters movie title not in the IMDB database, or enters an incorrect title */
            if (body.Response === 'False') {
                console.log('\nMovie not found. Please check the title or try another title.');
            } else {
                console.log('\nTitle:', body.Title, '\nYear:', body.Year, '\nIMDB Rating:', body.imdbRating, '\nRotten Tomatoes rating:', body.Ratings[1].Value, '\nCountry:', body.Country, '\nLanguage:', body.Language, '\nPlot:', body.Plot, '\nActors & Actresses:', body.Actors);
            };
        });
    };
};

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