
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/vim');
const codeMirror = require('codemirror');
const imageHandler = require('./classes/images');
const PouchDb = require('pouchdb');

// TODO: recursive search for all images (based on url inside)
function update(editor) {
  let elem;
  let content = editor.getValue();
  let img_re = /!\[[^\]]+\]\(([^)]+)\)/;
  let output = content.match(img_re);
  console.log(output)
  if (output !== null) {
    let lines = document.getElementsByClassName('CodeMirror-line');
    let pos = editor.posFromIndex(output.index);
    let line = lines[pos.line];
    console.log('thing')
    if (!imageHandler.isAdded(pos.line)) {
      elem = document.createElement('img');
      elem.src = 'http://octodex.github.com/images/octobiwan.jpg';
      elem.className = 'inline-img';
      line.parentNode.appendChild(elem);
      imageHandler.addImage(pos.line, elem);
      console.log('in if')
    } else {
      console.log('in else')
      elem = imageHandler.getImage(pos.line);
      line.parentNode.appendChild(elem);
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

// add a 1 sec debounce for adding tags
var debounceFunc;
function addTag(tag) {
  clearTimeout(debounceFunc);
  debounceFunc = setTimeout(()=>{
    // pass (for now)
  }, 1000);
}

editor.on('change', update);
