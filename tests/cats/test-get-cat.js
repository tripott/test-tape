const test = require('tape')
const request = require('supertest')
const cats = require('../../api/data/cats')
const app = require('../../api/app')

test('GET /cats/:id', t => {
  request(app)
    .get('/cats/mittens')
    .then(doc => {
      t.plan(2)
      t.equals(doc.statusCode, 200, `STATUS CODE OK 200`)
      t.same({ name: 'mittens', breed: 'Tabby', age: 10 }, doc.body, 'DATA OK')
      t.end()
    })
})
