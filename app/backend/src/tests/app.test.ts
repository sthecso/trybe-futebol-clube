import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test endpoint /login', () => {
  let chaiHttpResponse: Response;

  it('status = 200 and returns an object', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: "admin@admin.com",
      password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })
    
    expect(chaiHttpResponse).have.status(200);
    expect(chaiHttpResponse.body).to.be.an('object');
  });

  it('can not login without email', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW" })
    
    expect(chaiHttpResponse).have.status(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('can not login without password', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: "admin@admin.com" })
    
    expect(chaiHttpResponse).have.status(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });
});
