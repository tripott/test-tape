const test = require('tape')
const request = require('supertest')

const app = require('../../api/app')

test('GET /', t => {
  request(app)
    .get('/')
    .end((err, res) => {
      t.plan(2)
      t.equals(res.text, 'Hello World!', 'DATA OK')
      t.equals(res.statusCode, 200, 'STATUS CODE OK 200')
      t.end()
    })
})
