
const markdownit = require('markdown-it')();

function render (content) {
  return markdownit.render(content);
}

module.exports = render;
