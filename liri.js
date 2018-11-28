require("dotenv").config();
var fs = require('fs');

var keysJS = require("./keys.js");
var request = require('request');
var spotify = require('node-spotify-api');
var moment = require('moment');

var spotifyAPI = new spotify(keysJS.spotify);

var command = process.argv[2];
var itemToSearch = process.argv[3];

// console.log(command, itemToSearch);

function instructions() {
    console.log("____________________________________________________________________________________\nINSTRUCTIONS:\nTo use this app, enter 2 items at the command line: \nfor concert info, type concert-this, followed by the artist you want to search.\nFor spotify info, type spotify-this-song, followed by the artist name. \nFor movie info, type movie-this, followed by the movie title. \ndo-what-it-says, processes the output from an existing text file, random.txt. \nFor elements with more than 1 word in their name, surround the content in quotes.\nFor example - type this at the command line: node liri.js movie-this \"Star Wars\"\n____________________________________________________________________________________")
};

function concert() {
    // console.log('concert-this');
    instructions();

    var concertURL = "https://rest.bandsintown.com/artists/" + itemToSearch + "/events?app_id=codingbootcamp";

    request(concertURL, function (error, response, body) {
        // console.log('error', error);
        // console.log(JSON.parse(body));
        body = JSON.parse(body);
        if (body.length < 1) {
            console.log("There is no info for this band. Please try another band.");
        } else {
            for (let i = 0; i < body.length; i++) {
                console.log(body[i].venue.name + ',' + ' ' + body[i].venue.city + ',' + ' ' + body[i].venue.region, moment(body[i].datetime).format("MM/DD/YYYY"))
            };
        };
    });
}

function song() {
    instructions();
    console.log(`spotify-this-song`);
}

function movie() {
    instructions();

    var movie = "Mr. Nobody";
    var omdbURL = "https://www.omdbapi.com/?t=" + itemToSearch + "&y=&plot=short&apikey=trilogy";

    request(omdbURL, function (error, response, body) {
        // console.log('error', error);
        body = JSON.parse(body);
        if (body.length < 1) {
            console.log("There is no info for this movie. Please try another title.");
        } else {
            console.log('Title:', body.Title, '\nYear:', body.Year, '\nIMDB Rating: ' + body.imdbRating, '\nRotten Tomatoes rating: ', body.Ratings[1].Value, '\nCountry: ', body.Country, '\nLanguage', body.Language, '\nPlot: ', body.Plot, '\nActors & Actresses: ', body.Actors)
        };
    });
}

function whatItSays() {
    instructions();

    fs.readFile('random.txt', 'utf8', function (error, data) {
        var randomTxtArray = data.split(',')
        command = randomTxtArray[0];
        itemToSearch = randomTxtArray[1];

        switchStatement();
        // console.log(data);
    })
    console.log(`do-what-it-says`);
}

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

        case 'instructions':
            instructions();

        default:
            console.log('Sorry, that input is invalid. Please enter a valid command. For help, type instructions at the command prompt.');
    }
};

switchStatement();