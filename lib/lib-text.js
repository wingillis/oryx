
var text = {
  findImgTags (str) {
    let img_re = /!\[[^\]]+\]\(([^)]+)\)/g;
    return this.findTag(img_re, str);
  },

  findHashTags (str) {
    let hash_re = /(#[\w]+)/g;
    return this.findTag(hash_re, str);
  },

  findTag(rex, str) {
    let match;
    let output = {};
    while ((match = rex.exec(str)) != null) {
      output[match.index] = match[1];
    }
    return output;
  }
};

module.exports = text;
