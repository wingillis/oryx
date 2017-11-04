
// don't need no refs
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/vim');

const imageHandler = require('./lib/images');
const uuid = require('uuid/v4'); // random uuid
const Editor = require('./lib/editor');
const SearchBar = require('./lib/search');
const {remote, ipcRenderer} = require('electron');
let menu = remote.Menu.getApplicationMenu();

// singleton
const db = require('./lib/db');

let editor = new Editor('code');
let searchBar = new SearchBar('sidebar', editor);


menu.items[1].submenu.append(new remote.MenuItem({
  label: 'New File',
  accelerator: 'CmdOrCtrl+N',
  click: () => {editor.newFile()}
}));

menu.items[1].submenu.append(new remote.MenuItem({
  label: 'Search',
  accelerator: 'CmdOrCtrl+L',
  click: () => {searchBar.focusSearch()}
}))

menu.items[1].submenu.append(new remote.MenuItem({
  label: 'Save',
  accelerator: 'CmdOrCtrl+S',
  click () {
    db.getAllNotes().then((allDocs) => {
      let notes = allDocs.rows.map((el) => { return el.doc })
      notes = notes.filter((el) => { return el.text != null })
      ipcRenderer.send('save-notes', notes)
    })
  }
}))

remote.Menu.setApplicationMenu(menu);

document.getElementsByClassName('codeMirror')[0].style.backgroundImage = `url('./dist/oryx${getRandomInt(1, 8)}.png')`;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

document.ondragover = document.ondrop = (evt) => {
  evt.preventDefault();
}

document.body.ondrop = (evt) => {
  editor.insertImgPath(evt.dataTransfer.files[0].path);
  evt.preventDefault();
}
