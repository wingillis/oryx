
require('codemirror/mode/gfm/gfm');
const codeMirror = require('codemirror');

let editor = codeMirror.fromTextArea(document.getElementById('code'),
  {
    mode: "gfm",
    theme: 'base16-dark',
    lineWrapping: true,
    matchBrackets: true,
    lineNumbers: true
  });
