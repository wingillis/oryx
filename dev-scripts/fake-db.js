
const PouchDb = require('pouchdb');
const uuid = require('uuid/v4');
const util = require('util');

let buf, f;

// important - this is a leveldb implementation
let db = new PouchDb('./test.db');


for (let i=0; i<10; i++) {
  buf = Buffer.from(uuid());
  f = {};
  f[util.format('Test title %d.txt', i)] = {
    'content_type': 'text/plain',
    data: buf
  };
  db.put({
    _id: uuid(),
    title: 'Test title ' + i,
    preview: 'test preview',
    tags: ['#tag'],
    _attachments: f
  });
}

setTimeout(() => {
  db.close()
}, 1200)
