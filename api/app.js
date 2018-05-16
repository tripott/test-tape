const app = require('express')()
const port = process.env.PORT || 3000
var cats = require('./data/cats')
const { find, last, compose, assoc } = require('ramda')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/cats', (req, res, next) => {
  cats.push(req.body)
  res.status(201).send(compose(assoc('ok', true), last)(cats))
})

app.get('/cats', (req, res, next) => {
  res.status(200).send(cats)
})

app.get('/cats/:name', (req, res, next) => {
  res.status(200).send(find(c => c.name === req.params.name, cats))
})

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

if (!module.parent) {
  app.listen(port, () => console.log(`UP on ${port}!`))
}

module.exports = app
