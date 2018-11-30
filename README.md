# liri-node-app

LIRI stands for *Language Interpretation and Recognition Interface*.
LIRI makes use of JavaScript, Node.js and various packages to take in user input from the command line. It uses API calls for Spotify, IMDB (Internet Movie DataBase), and Bands in Town, as well as a custom query that extracts data from a text file and outputs the results to the command line/console.

## Setup:
1. If not installed already, download & install `Node.js` on your computer: https://nodejs.org/en/

2. Copy the files to the directory you wish to run LIRI from  
3. If you wish to use the Spotify functionality, you will need to get a `Spotify ID` and `secret`.

    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down.
    
    * create a new file named `.env` in the same directory as the other files you created and paste in the following, each item on its own line. Replacing the code after the = sign with your Spotify ID and secret.
    `SPOTIFY_ID=your-spotify-id`
    `SPOTIFY_SECRET=your-spotify-secret`

4. at the console command prompt, type `npm i` - this will read the `package.json` file and install any needed npm packages.


## Instructions:
To use this app, navigate in the command line to the directory where the LIRI files are located, type `node`, and enter 2 items: 
for concert info, type `concert-this`, followed by the artist you want to search.
For spotify info, type `spotify-this-song`, followed by the artist name. 
For movie info, type `movie-this`, followed by the movie title. 
`do-what-it-says` processes the output from an existing text file, random.txt. 
For elements with more than 1 word in their name, surround the content in quotes.
For example - type this at the command line: `*node liri.js movie-this "Star Wars"*`

## Technology used:
* JavaScript
* Node.js - https://nodejs.org/en/
* Moment.js for date formatting - https://www.npmjs.com/package/moment
* Request HTTP client - https://www.npmjs.com/package/request#promises--asyncawait
* Node Spotify API - https://www.npmjs.com/package/node-spotify-api
* dotenv - https://www.npmjs.com/package/dotenv