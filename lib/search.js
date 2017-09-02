const Vue = require('vue');

class SearchBar {
  constructor (barId) {
    // query all files for display
    let files = {
      'title 1': 'file 1',
      'title 2': 'file 2',
      'title 3': 'file 3'
    };

    this.vue = new Vue({
      el: '#' + barId,
      data: {
        searchInput: '',
        files: files
      }
    });
  }
}

module.exports = SearchBar;
