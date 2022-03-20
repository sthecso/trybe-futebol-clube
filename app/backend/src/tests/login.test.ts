import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Request POST Login',() => {
  it('On Incorrect email or password results in Response 401 with message',async () => {
    let loginResponse = await chai.request(app)
     .post('/login')
     .send({
       email: 'wrongTest@user.com',
       password:'123213213',
     });
     expect(loginResponse).to.have.status(401);
     expect(loginResponse.body).to.have.property("message");
  });
});
