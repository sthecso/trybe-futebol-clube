import * as chai from 'chai';
import { exec } from 'shelljs';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Error handler tests', () => {
  let chaiHttpResponse: Response;

  before(() => {
    exec('npx sequelize db:drop');
  });

  it('When an unexpected error hapens, responds with status 500 and default message', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { message } = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(message).to.be.equal('Something went wrong here, please try again later');
  });
});
