const PouchDb = require('pouchdb')
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
    this.db = null;
    this.path = './dev-scripts/test.db'
  }

  createEntry () {
    // TODO: clean this up with actual vals
    return {
      _id: null,
      tags: null,
      preview: null,
      title: null,
      text: null,
      lastEdited: Date.now() // returned in ms
    };
  }

  open () {
    this.db = new PouchDb(this.path)
  }

  close () {
    this.db.close()
  }

  listFiles () {
    return this.db.allDocs({include_docs: true})
  }

  add (doc) {
    this.db.put(doc)
  }

  getNewestFile () {
    // TODO: write query for newest file
    return this.db.query()
  }
}

// create a singleton instance of the database
module.exports = new DB();
