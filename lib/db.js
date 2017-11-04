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

  getFile (id) {
    return this.db.get(id);
  }

  searchByTag (tag) {
    let db = this.db;
    var tags = tag.split(' ');
    function map (doc, emit) {
      for (var tag in tags) {
        let rex = new RegExp(tags[tag]);
        for (var t2 in doc.tags) {
          if (doc.tags[t2].match(rex) != null) {
            emit(doc._id, {preview: doc.preview, title: doc.title, tags: doc.tags, _id: doc._id});
            return;
          }
        }
      }
    }
    return db.query(map);
  }

  searchText(val) {
    let db = this.db;
    return this.db.createIndex({
      index: {fields: ['text']}
    }).then(function () {
      return db.find({
        selector: {
          text: {$regex: new RegExp(val)}
        }
      })
    })
  }

  listFiles () {
    return this.db.find({
      fields: ['_id', 'title', 'tags', 'preview'],
      selector: {lastEdited: {$gte: null}},
      sort: [{lastEdited: 'desc'}]
    });
  }

  add (doc) {
    return this.db.put(doc);
  }

  delEntry (id) {
    let db = this.db;
    return this.db.get(id).then(function (result) {
      return db.remove(result);
    })
  }

  getNewestFile () {
    // TODO: write query for newest file
    // return this.db.query()
  }

  getAllNotes () {
    // gets all notes and returns them to the thing
    return this.db.allDocs({include_docs: true})
  }
}

// create a singleton instance of the database
module.exports = new DB();
