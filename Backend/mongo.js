const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb://alvarxxx:${password}@ac-eqyxcov-shard-00-00.1x7qj12.mongodb.net:27017,ac-eqyxcov-shard-00-01.1x7qj12.mongodb.net:27017,ac-eqyxcov-shard-00-02.1x7qj12.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-6mup56-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: false,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

