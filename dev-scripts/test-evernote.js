
const Evernote = require('evernote');
const fs = require('fs');
const oauth = require('oauth').OAuth2;

// grab my personal stuffs
let config = fs.readFileSync(process.env.HOME + '/.oryxrc');
config = JSON.parse(config);
var client = new Evernote.Client({
  consumerKey: config.key,
  consumerSecret: config.secret,
  sandbox: true
});

let accessToken, accSecret;

function loginEvernote() {
  console.log('Logging in...')
  // var o2 = new oauth(config.key,
  //   config.secret,
  //   config.hostname + '/oauth',
  //   null,
  //   'oauth2/token',
  //   null
  // );
  //
  // console.log('get oauth token')
  // o2.getOAuthAccessToken('',
  //   {'grant_type':'client_credentials'},
  //   function (e, acc, ref, results) {
  //     console.log(e)
  //     console.log(`Token received: ${acc}`)
  //     accessToken = acc;
  //     // done()
  //   }
  // )
  client.getRequestToken('localhost:8080', function (err, tok, sec) {
    accessToken = tok;
    accSecret = sec;
    console.log(client.getAuthorizeUrl(tok))
    // client.getAccessToken(tok, sec)
  });
}

function getNotebooks() {
  // let c = new Evernote.Client({
  //
  // })
  client.getNoteStore().listNotebooks().then(function (notebooks) {
    console.log(notebooks)
  }).catch(function (err) {
    console.log(err);
  })
}

loginEvernote()
