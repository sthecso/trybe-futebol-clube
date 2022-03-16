import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { Response } from 'superagent';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  const mockUserPost = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };

  const mockToken = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

  let chaiHttpResponse: Response;

  it('has the correct response', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .set('content-type', 'application/json')
       .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { user, token, message } = chaiHttpResponse.body;

    console.log(chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
