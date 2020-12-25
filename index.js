require('dotenv').config();
const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function () {
  //connect to Twitter via api
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  //pull tweet from ss(spreadSheet)
  const sheet = new Sheet();
  await sheet.load();

  const quotes = await sheet.getRows();
  if (quotes.length !== 0) {
    const status = quotes[0].quotes;

    //send tweet
    client.post(
      'statuses/update',
      { status },
      function (error, tweet, response) {
        if (error) throw error;
        console.log(tweet); // Tweet body.
      }
    );

    //remove quote from ss
    await quotes[0].delete();
  } else {
    console.log('Quotes finish Please some more Quotes');
  }
})();
