const Vue = require('vue');
const db = require('./db');

class SearchBar {
  constructor (barId) {
    // query all files for display
    this.vue = new Vue({
      el: '#' + barId,
      data: {
        searchInput: '',
        files: null
      }
    });
    let vue = this.vue;
    db.listFiles().then(function (result) {
      vue.files = result.rows;
    });
  }
}

module.exports = SearchBar;
