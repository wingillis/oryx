
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/vim');
const codeMirror = require('codemirror');
const imageHandler = require('./lib/images');
const PouchDb = require('pouchdb');
const uuid = require('uuid/v4'); // random uuid

function findImgTags(str) {
  // returns an object of url and index
  let output = {};
  let match;
  let img_re = /!\[[^\]]+\]\(([^)]+)\)/;
  while ((match = img_re.exec(str)) != null) {
    output[match.index] = match[1];
  }
  return output;
}

function findHashTags(str) {
  // finds hash tags for organizing the notes
}

// TODO: recursive search for all images (based on url inside)
function update(editor) {
  let elem, url, pos, line;
  let content = editor.getValue();
  let output = findImgTags(content);
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

// start db
let db = new PouchDb('texts');

let editor = codeMirror.fromTextArea(document.getElementById('code'),
  {
    mode: "gfm",
    theme: 'base16-dark',
    lineWrapping: true,
    matchBrackets: true,
    lineNumbers: true,
    keyMap: 'vim'
});

function getAllTags () {

}

function listTags () {

}

// add a 1 sec debounce for adding tags
var debounceFunc;
function addTag(tag) {
  clearTimeout(debounceFunc);
  debounceFunc = setTimeout(()=>{
    // pass (for now)
  }, 1000);
}

editor.on('change', update);
