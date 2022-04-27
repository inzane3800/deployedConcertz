var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'DVU9UgHPf452keabX2ZTtWWK',
  consumer_secret: 'YhVSAUAmdu9qG8VZogilmdEucq8MUYIXuM6gJACgquBW7WesL0',
  access_token_key: '2274132691-YCkP6KGNDXjim9QdjVDDSFFyOcGWIHX3uDjPnvS',
  access_token_secret: 'JGUC6kZXAacmJYXRM5obHnawwF79KEJiw5U3Us9wxbM2r'
});

client.get('search/tweets', {q: 'Mission Ballroom'}, function(error, tweets, response) {
   console.log(tweets);
});
