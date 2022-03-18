import * as chai from 'chai';
// import { Response } from 'superagent';
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp)

describe('Login test request', async () => {
  // const mockMaroto = {
  //   id: 1,
  //   username: "Admin",
  //   role: "admin",
  //   email: "admin@admin.com",
  //   password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
  // };

  it('tests for failure with null email', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      });
    chai.expect(response.status).to.equal(401);
    chai.expect(response.body.message).to.equal("All fields must be filled")
  })
  it('tests for failure with null password', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
      });
    chai.expect(response.status).to.equal(401);
    chai.expect(response.body.message).to.equal("All fields must be filled")
  })
})
