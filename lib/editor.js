const codeMirror = require('codemirror');
const textLib = require('./text');

class Editor {
  constructor (textAreaId) {
    // make the editor instance
    this.editor = codeMirror.fromTextArea(
      document.getElementById(textAreaId),
      { // codemirror options
        mode: "gfm",
        theme: 'base16-dark',
        lineWrapping: true,
        matchBrackets: true,
        lineNumbers: true,
        keyMap: 'vim'
      }
    );
    this.editor.on('change', this.update)
  }

  update (editor) {
    // orig function in main.js
    // find instances of tags and images and handle them

  }

  get editor() {
    return this.editor;
  }
}

module.exports = Editor;
