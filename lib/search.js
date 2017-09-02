const Vue = require('vue');

class SearchBar {
  constructor (barId) {
    this.vue = new Vue({
      el: '#' + barId,
      data: {
        searchInput: ''
      }
    });
  }
}

module.exports = SearchBar;
