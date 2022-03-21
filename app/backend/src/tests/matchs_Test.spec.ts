import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET Route', () => {
  let chaiHttpResponse: Response;
  it('when return status code 200', async () => {
    chaiHttpResponse = await chai.request(app).get('/matchs')
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
