import assert from 'assert'
import { describe, it } from 'mocha'

describe('Sanity Test', () => {
  it('Should return true', () => {
    assert.strictEqual(true, true)
  })

  it('Should return 3', () => {
    assert.strictEqual(3, 1 + 2)
  })
})
