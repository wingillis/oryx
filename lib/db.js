const PouchDb = require('pouchdb');
PouchDb.plugin(require('pouchdb-find'));
const uuid = require('uuid/v4');
// doc format
/*
{
  _id: uuid,
  preview: 30 chars - beginning of text,
  tags: related tags,
  title: title of doc,
  text: blob file attachment
  lastEdited: timestamp
}
*/

class DB {
  constructor () {
    // contruct NOTHING
    // TODO: turn off for testing
    this.path = './dev-scripts/test.db';
    this.db = new PouchDb(this.path);
    this.db.createIndex({
      index: {fields: ['lastEdited']}
    });
  }

  createEntry () {
    // TODO: clean this up with actual vals
    return {
      _id: uuid(),
      tags: null,
      preview: null,
      title: null,
      text: null,
      lastEdited: Date.now() // returned in ms
    };
  }

  open (path) {
    this.close().then(() => {
      this.db = new PouchDb(path);
    });
  }

  close () {
    return this.db.close();
  }

  listFiles () {
    return this.db.find({include_docs: true, selector: {lastEdited: {$gte: null}}, sort: ['lastEdited']});
  }

  add (doc) {
    return this.db.put(doc);
  }

  getNewestFile () {
    // TODO: write query for newest file
    // return this.db.query()
  }
}

// create a singleton instance of the database
module.exports = new DB();
