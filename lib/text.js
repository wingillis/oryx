
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
  },

  getNonWhitespaceLine(content, n) {
    // gets first line of text to become the title
    let arr = content.split('\n');
    let flag = false;
    let index = 0;
    let lineno = 0;
    while (!flag && index < arr.length) {
      if (arr[index] !== '' && lineno == n) {
        flag = true;
      } else if (arr[index] !== '') {
        lineno++;
        index++;
      } else {
        index++;
      }
    }
    if (flag) {
      // remove hashes if present
      return arr[index].replace(/#/g, '');
    } else {
      return null;
    }
  }
};

module.exports = text;
