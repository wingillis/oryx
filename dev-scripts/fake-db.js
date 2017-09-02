
const PouchDb = require('pouchdb');
const uuid = require('uuid/v4');
const util = require('util');

let buf, f;

// important - this is a leveldb implementation
let db = new PouchDb('/Users/wgillis/dev/node/oryx/dev-scripts/test.db');


for (let i=0; i<2; i++) {
  db.put({
    _id: uuid(),
    title: 'This is a long test title ' + i,
    preview: 'test preview ' + i,
    text: uuid(),
    tags: ['#tag']
  });
}

setTimeout(() => {
  db.close()
}, 1200)
