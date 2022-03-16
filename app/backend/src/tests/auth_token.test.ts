import * as chai from 'chai';
import { expect } from 'chai';
import Token from '../auth/Token'

describe('Teste Unitário Token', () => {
  it('Testa se a função generate', () => {
    const token = Token.generate({ email: 'test@test.com' })
    expect(token).to.be.a('string')
  })

  it('Testa se a função verify', () => {
    const payload = Token.verify(token)
    expect(payload).to.be.a('object')
  })
})
