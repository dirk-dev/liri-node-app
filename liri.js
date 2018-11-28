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

function concert() {
    console.log('concert-this');
    var URL = "https://rest.bandsintown.com/artists/" + itemToSearch + "/events?app_id=codingbootcamp";

    request(URL, function (error, response, body) {
        // console.log('error', error);
        // console.log(JSON.parse(body));
        body = JSON.parse(body);
        if (body.length < 1) {
            console.log("There is no info for this band. Please try another band.");
        } else {
            console.log(body[0].venue.name + ',' + ' ' + body[0].venue.city + ',' + ' ' + body[0].venue.region, moment(body[0].datetime).format("MM/DD/YYYY"))
        }
    });
}

function song() {
    console.log(`spotify-this-song`);
}

function movie() {
    var movie = "Mr. Nobody";
    var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    console.log(`movie-this`);
}

function whatItSays() {
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

        case `spotify-this-song`:
            song();
            break;

        case `movie-this`:
            movie();
            break;

        case `do-what-it-says`:
            whatItSays();
            break;

        default:
            console.log('please enter a valid command');
    }
};

switchStatement();