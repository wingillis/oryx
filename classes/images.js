
class ImageHandler {
  constructor () {
    this.images = {};
  }

  addImage (line, elem) {
    this.images[line] = elem;
  }

  isAdded(line) {
    return this.images[line] != null;
  }

  getImage(line) {
    return this.images[line];
  }
}

module.exports = new ImageHandler();
