
const text = require('../lib/lib-text');
const assert = require('assert');

describe('text', function () {
  describe('find hash tag', function () {
    it('should find a tag with this string', function () {
      assert.equal('#tag', text.findHashTags('I will send this #tag to you')[0]);
    });
  });

  describe('find img tag', function () {
    it('should find an img .md tag and return it', function () {
      assert.equal('![img](test)', text.findImgTags('this is a bunch ![img](test) of text')[0]);
    });
  });
  
});
