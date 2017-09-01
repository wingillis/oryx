
class ImageHandler {
  constructor () {
    this.images = {};
  }

  addImage (line, url, elem) {
    if (this.images[url] != null) {
      this.images[url].lines.append(line)
      this.images[url].e.append(elem)
    } else {
      this.images[url] = {e: [elem], lines: [line]};
    }
  }

  isAdded(url) {
    return this.images[url] != null;
  }

  getImage(url) {
    return this.images[url];
  }
}

module.exports = new ImageHandler();
