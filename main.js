
// don't need no refs
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/vim');

const imageHandler = require('./lib/images');
const uuid = require('uuid/v4'); // random uuid
const Editor = require('./lib/editor');
const SearchBar = require('./lib/search');
// const {ipcRenderer} = require('electron');

// singleton
const db = require('./lib/db');

let editor = new Editor('code');
let searchBar = new SearchBar('sidebar');
// db.getNewestFile().then(function (resp) {
  // editor.setFile(resp)
// });
