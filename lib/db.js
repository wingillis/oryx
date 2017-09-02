const PouchDb = require('pouchdb');

// doc format
/*
{
  _id: uuid,
  preview: 30 chars - beginning of text,
  tags: related tags,
  title: title of doc,
  text: blob file attachment
}
*/

class DB {
  constructor () {
    // contruct NOTHING
    // TODO: turn off for testing
    this.path = './dev-scripts/test.db';
    this.db = null;
  }

  set dbPath (val) {
    this.path = val;
  }

  open () {
    this.db = new PouchDb(this.path);
  }

  close () {
    this.db.close();
  }

  listFiles () {
    return this.db.allDocs({include_docs: true})
  }
}

// create a singleton instance of the database
module.exports = new DB();
