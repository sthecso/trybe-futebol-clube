import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const tokenExpression = /^ey[\w-]+\.ey[\w-]+\.[\w-]+$/

describe('Verifica se o usuário fez login', () => {
  it('Procura um usuário no banco de dados', async () => {
    const user = await User.findOne();
    console.log(typeof user);
    expect(user).to.be.a('string');
  });
});
