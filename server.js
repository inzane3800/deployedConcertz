// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier


// Home page - DON'T CHANGE
app.get('/', function(req, res) {
  res.render('pages/home', {
    my_title: "Concertz Platform",
    items: '',
    error: false,
    message: ''
  });
});

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'jsz08yJr4Foa4oOAr0L6pvzA6',
  consumer_secret: 'BhbdQB0JVcjNXWXEOjpJK865t9orUSe9crOPPQU1fRfPXGl1Gl',
  access_token_key: '2289164635-IHRjiUrpkUD5Zt08dPyIXiGjkO0msCqqZBT9Tyk',
  access_token_secret: 'tmpR2t1qNuJeZbv905i6qyAWwHbrwprku7TPFcbtMde7D'
});

app.post('/results', function(req, res) {
  var title = req.body.title;
  var api_key = "Ev6RuBPoWioJxGsMvlECWaAS17FFoCZe";
  var itemss;
  function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
      }, 2000);
    });
  }
  async function asyncCall() {
    const result = await resolveAfter2Seconds();
    // expected output: "resolved"
  }
  if(title) {
    axios({
      url: `https://api.songkick.com/api/3.0/search/locations.json?query=${title}&apikey=r00frqHrOoBaQjzs`,
        method: 'GET',
        dataType:'json',
      })
        .then(async item => {
          let item1 = item.data.resultsPage.results.location[0].metroArea;
          // console.log(item.data.resultsPage.results.location[0].metroArea.id);
          axios({
            url: `https://api.songkick.com/api/3.0/metro_areas/${item.data.resultsPage.results.location[0].metroArea.id}/calendar.json?apikey=r00frqHrOoBaQjzs&min_date=2022-04-10&page=1&per_page=50`,
              method: 'GET',
              dataType:'json',
            })
              .then(async items => {
          var tweetsarr = []
          for(var item of items.data.resultsPage.results.event){
            client.get('search/tweets', {q:item.venue.displayName}, function(error, tweets, response) {
               asyncCall();
               tweetsarr.push(tweets);
            });
          }
          setTimeout(() => {
            //console.log(tweetsarr);
            let combo = {item: item1, items: items.data.resultsPage.results.event, tweets:tweetsarr};
             console.log(combo);
            res.render('partials/reviews',{
              items: combo});
            }, 10000)
        })
      })
  }
  else {
    res.render('pages/home',{
      my_title: "Concertz Platform",
      items: '',
      error: true,
      message: "Must enter a search"
    })
  }
});


app.listen(process.env.PORT || 5000);
console.log('3000 is the magic port');
