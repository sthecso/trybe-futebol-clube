import * as sinon from 'sinon';
import * as chai from 'chai';

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

const { expect } = chai;

// tests user model
describe('User Model', () => {
  it('Deve retornar um usuário', async () => {
    const user = await User.findOne({
      where: {
        id: 1,
      },
    });
    expect(user).to.be.an('object');
  });

})