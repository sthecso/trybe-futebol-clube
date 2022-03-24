// import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('testing "/clubes" route', () => {
  let chaiHttpResponse: Response;


  it('a) if get clubs was successful', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubes')

    expect(chaiHttpResponse).to.have.status(StatusCodes.OK);
    expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('b) if get clube by id was successful', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubes/1')
  
    expect(chaiHttpResponse).to.have.status(StatusCodes.OK);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('clubName');
  })
});
