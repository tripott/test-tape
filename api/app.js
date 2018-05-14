const app = require('express')()
const port = process.env.PORT || 3000
const cats = require('./data/cats')
const { find } = require('ramda')

app.get('/', (req, res) => res.send('Hello World!'))

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

app.listen(port, () => console.log(`UP on ${port}!`))
