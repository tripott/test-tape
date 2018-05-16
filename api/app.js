const app = require('express')()
const port = process.env.PORT || 3000
var cats = require('./data/cats')
const { find, last, compose, assoc, isNil } = require('ramda')
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/cats', (req, res, next) => {
  if (isNil(find(cat => cat.name === req.body.name, cats))) {
    cats.push(req.body)
    res.status(201).send(compose(assoc('ok', true), last)(cats))
  } else {
    return next(new HTTPError(409, 'Duplicate'))
  }
})

app.get('/cats', (req, res, next) => {
  res.status(200).send(cats)
})

app.get('/cats/:name', (req, res, next) => {
  res.status(200).send(find(c => c.name === req.params.name, cats))
})

app.use(function(err, req, res, next) {
  console.log(req.method, ' ', req.path, 'error:  ', err)
  res.status(err.status || 500)
  res.send(err)
})

if (!module.parent) {
  app.listen(port, () => console.log(`UP on ${port}!`))
}

module.exports = app
