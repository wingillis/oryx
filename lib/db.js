const PouchDb = require('pouchdb')
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
    this.db = null;
    this.path = './dev-scripts/test.db'
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
}

// create a singleton instance of the database
module.exports = new DB();
