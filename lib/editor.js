const codeMirror = require('codemirror');
const textLib = require('./text');

let editor;

class Editor {
  constructor (textAreaId) {
    // make the editor instance
    this.debounce = null;
    this.logBounce = null;
    editor = codeMirror.fromTextArea(
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
    let ref = this;
    editor.on('change', () => {
      clearTimeout(this.debounce);
      clearTimeout(this.logBounce);
      this.debounce = setTimeout(() => {ref.update(ref)}, 600);
      this.logBounce = setTimeout(() => {console.log(editor.getValue().split('\n'))}, 5000)
    })
    this.images = [];
    this.dbEntry = null;
  }

  update (ref) {
    // orig function in main.js
    // find instances of tags and images and handle them
    editor.operation(() => {
      let elem;
      let content = editor.getValue();
      let imgs = textLib.findImgTags(content);
      let hashtags = textLib.findHashTags(content);
      for (let i = 0; i<ref.images.length; i++) {
        editor.removeLineWidget(ref.images[i]);
      }
      ref.images.length = 0;
      let url;
      for (let ind in imgs) {
        elem = document.createElement('img');
        url = imgs[ind];
        if (url.match(/^https:\/\//)) {
          elem.src = imgs[ind];
        } else {
          elem.src = 'file://' + url;
        }
        elem.className = 'inline-img';
        ref.images.push(editor.addLineWidget(editor.posFromIndex(ind).line, elem));
      }

    });

  }

  setFile(dbEntry) {
    this.dbEntry = dbEntry;
    this.editor.setValue(dbEntry.text);
  }
}

module.exports = Editor;
