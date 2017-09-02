
const text = require('../lib/text');
const assert = require('assert');

describe('text', function () {
  describe('find hash tag', function () {
    it('should find a tag with this string', function () {
      var str = 'I will send this #tag to you';
      var out = text.findHashTags(str);
      var eqs = {};
      eqs[str.indexOf('#tag')] = '#tag';
      assert.deepEqual(eqs, out);
    });

    // TODO: add multiple tags
  });

  describe('find img tag', function () {
    it('should find an img .md tag and return it', function () {
      var str = 'this is a bunch ![img](test) of text';
      var out = text.findImgTags(str);
      var eqs = {};
      eqs[str.indexOf('![img](test)')] = 'test';
      assert.deepEqual(eqs, out);
    });

    // TODO: add multiple tags
  });

});
