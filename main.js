
// don't need no refs
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/vim');

const imageHandler = require('./lib/images');
const PouchDb = require('pouchdb');
const uuid = require('uuid/v4'); // random uuid
const Editor = require('./lib/editor');
const SearchBar = require('./lib/search');

// start db
let db = new PouchDb('texts');
// doc format
/*
{
  _id: uuid,
  preview: 30 chars - beginning of text,
  tags: related tags,
  title: title of doc,
  text: blob file attachment
}
*/

let editor = new Editor('code');
let searchBar = new SearchBar('search');

function update(editor) {
  let elem, url, pos, line;
  let content = editor.getValue();
  let output = textLib.findImgTags(content);
  if (output != null) {
    let lines = document.getElementsByClassName('CodeMirror-line');
    // go through all options
    for (var ind in output) {
      url = output[ind]; // TODO: handle urls properly
      pos = editor.posFromIndex(ind);
      line = lines[pos.line];
      if (!imageHandler.isAdded(url)) {
        elem = document.createElement('img');
        elem.src = 'http://octodex.github.com/images/octobiwan.jpg';
        elem.className = 'inline-img';
        line.parentNode.appendChild(elem);
        imageHandler.addImage(pos.line, url, elem);
      } else {
      elem = imageHandler.getImage(url);
      line.parentNode.appendChild(elem);
      }
    }
  }
}

function getAllTags () {

}

function listTags () {

}

// on new document, add db entry

// add a 1 sec debounce for adding tags
var debounceFunc;
function addTag(tag) {
  clearTimeout(debounceFunc);
  debounceFunc = setTimeout(()=>{
    // pass (for now)
  }, 1000);
}
