const Evernote = require('evernote')
const {readFileSync} = require('fs')
const mkdn = require('markdown-it')()
const html2enml = require('htmltoenml')

const config = JSON.parse(readFileSync(process.env.HOME + '/.oryxrc'))

process.on('message', (notes) => {
  // upload these notes to evernote, only if they haven't been uploaded before
  let client = new Evernote.Client({
    token: config.devToken,
    sandbox: false
  })
  let notestore = client.getNoteStore()
  notestore.listNotebooks().then((nbks) => {
    let nb = nbks.filter((nb) => {
      return nb.name === 'oryx'
    })
    nb = nb[0].guid
    // render a note now
    notes.forEach((note) => {
      let md = mkdn.render(note.text)
      md = `<body>\n${md}\n</body>`
      let tags = note.tags.map((tag) => {
        return tag.replace('#', '')
      })
      html2enml.fromString(md, {}, (err, html, resources) => {
        // upload to evernote, only if it already isn't there
        html = html.replace('http://www.w3.org/1999/xhtml', 'http://xml.evernote.com/pub/enml2.dtd')
        let enote = new Evernote.Types.Note()
        enote.title = note.title.replace(/^# /, '')
        enote.content = html
        enote.notebookGuid = nb
        enote.tagNames = tags
        notestore.createNote(enote).catch((err) => {
          console.log(err)
        })
      })

    })
  }).catch((err) => {
    // catching a listNotebooks error here
    console.log(err)
  })

  // if they have, then delete and replace
})
