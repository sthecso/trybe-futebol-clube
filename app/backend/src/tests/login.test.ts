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
        password: 'secret_admin',
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
  it('test if fails with non-existent email', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'nobru@apelao.com',
        password: 'secret_admin',
      });
    chai.expect(response.status).to.equal(401);
    chai.expect(response.body).to.deep.equal({ message: "Incorrect email or password" })
  })
  it('test if it fails with the wrong password', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'dereguejhonson',
      });
    chai.expect(response.status).to.equal(401);
    chai.expect(response.body).to.deep.equal({ message: "Incorrect email or password" })
  })
  it('test the case suscess', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
    chai.expect(response.status).to.equal(200);
    chai.expect(response.body.user).not.to.be.undefined
    chai.expect(response.body.token).not.to.be.undefined
  })
})
