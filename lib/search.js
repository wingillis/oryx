const Vue = require('vue/dist/vue.common.js');
const db = require('./db');

let vue, editor;

function getAllFiles() {
  db.listFiles().then(function (result) {
    vue.files = result.docs;
  });
}

function searchInput(val) {
  if (val !== '') {
    if (val.startsWith('#')) {
      db.searchByTag(val).then(function (result) {
        let res = result.rows;
        vue.files = res.map((e) => {return e.value});
      });
    } else {
      // search in doc text
      db.searchText(val).then(function (result) {
        vue.files = result.docs;
      });
    }
  } else {
    getAllFiles();
  }
}

class SearchBar {
  constructor (barId, e) {
    // query all files for display
    editor = e;
    vue = new Vue({
      el: '#' + barId,
      data: {
        searchInput: '',
        files: null
      },
      methods: {
        clearInput () {
          this.searchInput = '';
          editor.focus();
        },
        open (id) {
          db.getFile(id).then(function(result) {
            editor.setFile(result);
          })
        },
        deleteEntry (id) {
          db.delEntry(id).then(function (result) {
            // vue.clearInput();
          })
        }
      },
      watch: {
        searchInput: function (val) {
          searchInput(val)
        }
      }
    });
    db.db.changes({since: 'now', live: true}).on('change', function () {
      searchInput(vue.searchInput);
    });
    getAllFiles();
  }

  focusSearch () {
    vue.$refs.inp.focus();
  }
}

module.exports = SearchBar;
