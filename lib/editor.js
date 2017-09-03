const codeMirror = require('codemirror');
const textLib = require('./text');
const db = require('./db'); // singleton

let editor, imgDebounce, dbUpdateDebounce;

class Editor {
  constructor (textAreaId) {
    // make the editor instance
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
      clearTimeout(imgDebounce);
      clearTimeout(dbUpdateDebounce);
      imgDebounce = setTimeout(() => {ref.update(ref)}, 700);
      dbUpdateDebounce = setTimeout(() => {ref.updateDb(ref)}, 2000);
    });
    this.images = [];
    this.dbEntry = db.createEntry(); // stores the database entry for the current file
  }

  updateDb (ref) {
    let text = editor.getValue();
    let preview = textLib.getNonWhitespaceLine(text, 1);
    ref.dbEntry.text = text;
    ref.dbEntry.preview = preview;
    ref.dbEntry.title = textLib.getNonWhitespaceLine(text, 0);
    ref.dbEntry.lastEdited = Date.now();
    // assume the tags attr has been updated in the `update` function
    db.add(ref.dbEntry).then(function (result) {
      ref.dbEntry._rev = result.rev;
    })
  }

  focus () {
    editor.focus()
  }

  update (ref) {
    // orig function in main.js
    // find instances of tags and images and handle them
    editor.operation(() => {
      let elem;
      let content = editor.getValue();
      let imgs = textLib.findImgTags(content);
      let hashtags = textLib.findHashTags(content);
      // remove old img widgets
      for (let i = 0; i<ref.images.length; i++) {
        editor.removeLineWidget(ref.images[i]);
      }
      ref.images.length = 0;

      // add new widget and make a file url if not an http link
      let url;
      for (let ind in imgs) {
        elem = document.createElement('img');
        url = imgs[ind];
        // matches http links
        if (url.match(/^https:\/\//)) {
          elem.src = imgs[ind];
        } else {
          elem.src = 'file://' + url;
        }
        elem.className = 'inline-img';
        ref.images.push(editor.addLineWidget(editor.posFromIndex(ind).line, elem));
      }

      ref.dbEntry.tags = Object.values(hashtags).sort();

    });

  }

  setFile (dbEntry) {
    this.dbEntry = dbEntry;
    editor.setValue(dbEntry.text);
  }

  newFile() {
    this.dbEntry = db.createEntry();
    editor.setValue('');
  }
}

module.exports = Editor;
