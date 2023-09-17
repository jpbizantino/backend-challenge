import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { describe, it } from 'mocha'
import app from '../../index.js'

describe('1. Test Endpoint /api/v1/files/data', () => {
  chai.use(chaiHttp)

  let tempArray = []

  it('200 Response', (done) => {
    chai.request(app)
      .get('/api/v1/files/data')
      .end((err, res) => {
        if (err) return false

        tempArray = res.body

        expect(res).to.have.status(200)
        done()
      }) // end
  }) // 1.1.

  it('Response should is an array', () => {
    // Check if result is an array of values
    expect(tempArray).to.be.an('array')
  }) // it

  it('All "files" Level 0 JSON objects are valid', (done) => {
    expect(tempArray).to.satisfy(items => {
      items.every(item => {
        // Validate level 0
        return expect(item).to.have.property('file').to.be.an('string') && expect(item).to.have.property('lines').to.be.an('array')
      })

      done()
    })
  })

  it('All "lines" - Level 1 JSON objects are valid', (done) => {
    expect(tempArray).to.satisfy(items => {
      items.every(item => {
        // Validate level 1

        return expect(item.lines).to.satisfy(linesItems => {
          // TODO: Test all lines

          return expect(linesItems[0], 'text field is not present or value is not a text').to.have.property('text').to.be.an('string') &&
          expect(linesItems[0], 'number field is not present or value is not a number').to.have.property('number').to.be.an('number') &&
          expect(linesItems[0], 'hex field is not present or value is not a text').to.have.property('hex').to.be.an('string')
        })
      })

      done()
    })
  })
})

describe('2. Test Endpoint with valid fileName /api/v1/files/data?fileName=<value>', () => {
  chai.use(chaiHttp)

  it('200 Response for fileName = test2.csv', (done) => {
    chai.request(app)
      .get('/api/v1/files/data?fileName=test2.csv')
      .end((err, res) => {
        if (err) return false

        expect(res).to.have.status(200)
        done()
      }) // end
  }) // 1.1.
})

describe('3. Test Endpoint with invalid fileName /api/v1/files/data?fileName=<value>', () => {
  chai.use(chaiHttp)

  it('200 Response for fileName = jdhdh&&&6.csv', (done) => {
    chai.request(app)
      .get('/api/v1/files/data?fileName=jdhdh&&&6.csv')
      .end((err, res) => {
        if (err) return false

        expect(res).to.have.status(200)
        done()
      }) // end
  }) // 1.1.
})
