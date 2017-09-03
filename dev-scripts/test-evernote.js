
const Evernote = require('evernote');
const fs = require('fs');
const markdown = require('markdown-it')();
const htmltoenml = require('htmltoenml');

var notestr = `# Bugs in oryx application

#oryx #bugs

- It won't scroll to the bottom when adding an image
- probs want a quick open feature (added \`onenter\` to open top note when searching)
- add a focus editor cmd
- search bar font
- when adding text longer than window, window starts inching to the left
`;
// grab my personal stuffs
let config = fs.readFileSync(process.env.HOME + '/.oryxrc');
config = JSON.parse(config);
var client = new Evernote.Client({
  token: config.devToken,
  sandbox: false
});
var notestore = client.getNoteStore();
notestore.listNotebooks().then(function (nbs) {
  var nbguid = nbs.filter(function (nb) {
    return nb.name == 'oryx';
  });
  nbguid = nbguid[0].guid;
  var md = markdown.render(notestr);
  md = `<body>\n${md}\n</body>`;
  htmltoenml.fromString(md, {}, function (err, html, resources) {
    console.log(html);
    html = html.replace('http://www.w3.org/1999/xhtml', 'http://xml.evernote.com/pub/enml2.dtd');
    var enote = new Evernote.Types.Note();
    enote.title = 'Bugs in oryx application';
    enote.content = html;
    enote.notebookGuid = nbguid;
    enote.tagNames = ['tag1', 'tag2'];
    notestore.createNote(enote).catch(function (err) {
      console.log(err);
    })
  });

}).catch(function (err) {
  console.log(err)
})
