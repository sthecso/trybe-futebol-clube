import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Server', () => {
  // let chaiHttpResponse: Response;

  it('Deve retornar status 200', async () => {
    const response: Response = await chai.request(app).get('/');
    expect(response.status).to.be.equal(200);
  });

  // it('Deve retornar status 200', async () => {
  //   chaiHttpResponse = await chai.request(app).get('/');
  //   expect(chaiHttpResponse.status).to.be.equal(200);
  // });
});
