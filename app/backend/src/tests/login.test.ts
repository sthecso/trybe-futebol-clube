import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  let chaiHttpResponse;

  const mockUserPost = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: '',
  };

  const mockToken = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

  const mockErrorMessage = 'Incorrect email or password';

  it('has the incorrect body response', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'banana@banana.com',
        password: 'secret_banana',
      });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(message).to.be.eql(mockErrorMessage);
  });

  it('has the correct body response', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const { user, token } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(user).to.be.eql(mockUserPost);
    expect(token).to.be.eql(mockToken);
  });
});
