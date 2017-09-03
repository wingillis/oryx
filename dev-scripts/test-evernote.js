
const Evernote = require('evernote');
const fs = require('fs');

// grab my personal stuffs
let config = fs.readFileSync(process.env.HOME + '/.oryxrc');
config = JSON.parse(config);
var client = new Evernote.Client({
  token: config.devToken,
  sandbox: false
});

client.getNoteStore().listNotebooks().then(function (nbs) {
  console.log(nbs)
}).catch(function (err) {
  console.log(err)
})
