
// don't need no refs
require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/keymap/vim');

const imageHandler = require('./lib/images');
const uuid = require('uuid/v4'); // random uuid
const Editor = require('./lib/editor');
const SearchBar = require('./lib/search');
const {remote} = require('electron');
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
  label: 'Find Entry',
  accelerator: 'CmdOrCtrl+L',
  click: () => {searchBar.focusSearch()}
}))

remote.Menu.setApplicationMenu(menu);
