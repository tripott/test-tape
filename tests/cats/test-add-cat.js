const test = require('tape')
const request = require('supertest')
const cats = require('../../api/data/cats')
const app = require('../../api/app')

const requestBody = { name: 'mittens', breed: 'Tabby', age: 15 }
const { path } = require('ramda')

test('POST /cats', t => {
  request(app)
    .post('/cats')
    .send(requestBody)
    .expect(201)
    .then(doc => {
      t.plan(3)
      t.equals(doc.statusCode, 201, `STATUS CODE OK 201`)
      t.equals(path(['body', 'name'], doc), 'Tootles', `name value passed`)
      t.equals(path(['body', 'ok'], doc), true, `"ok" value is true`)
      t.end()
    })
})
