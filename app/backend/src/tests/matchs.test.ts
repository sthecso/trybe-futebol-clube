/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable func-names */
/* eslint-disable mocha/no-mocha-arrows */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-lines-per-function */
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/GET Matchs', () => {
  it('o status é 200', async function () {
    const result = await chai.request(app)
      .get('/matchs');
    expect(result.status).to.be.equals(200);
  });

  it('deveria retornar uma lista de matchs', async function () {
    const result = await chai.request(app)
      .get('/matchs');
    expect(result.status).to.be.equals(200);
    expect(Array.isArray(result.body)).to.be.equal(true);
  });
});
