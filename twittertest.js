var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'Lyk1VRpKBeUYGI8lwgZPwO2RL',
  consumer_secret: 'aQZA7YPL1Oh7k8ap5rDddxGovZ2I41QrofF9t8yEZEiNP4vmQJ',
  access_token_key: '612445179-AAnLexLyOvCUp5un8EwoXNGIhVpeLphYdxHArxnN',
  access_token_secret: '6rFK26tzTyzjCBuOXy3ac9oMSeqlMUxo9Sy9tIRJf4sUq'
});

client.get('search/tweets', {q: 'Mission Ballroom'}, function(error, tweets, response) {
   console.log(tweets);
});
