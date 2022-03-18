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

describe('/GET Clubs', () => {
  const userEmail = 'user@user.com';
  const userPassword = 'secret_user';
  let jwtToken: string;

  before(async () => {
    const login = {
      email: userEmail,
      password: userPassword,
    };
    const result = await chai.request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send(login);
    expect(result.body).to.haveOwnProperty('token');
    const { token } = result.body;
    jwtToken = token;
  });

  it('o status é 200', async function () {
    const result = await chai.request(app)
      .get('/clubs')
      .set('Authorization', jwtToken);
    expect(result.status).to.be.equals(200);
  });

  it('deveria retornar uma lista de clubs', async function () {
    const result = await chai.request(app)
      .get('/clubs')
      .set('Authorization', jwtToken);
    expect(Array.isArray(result.body)).to.be.equals(true);
  });

  it('deveria retornar somente um club', async function () {
    const result = await chai.request(app)
      .get('/clubs')
      .set('Authorization', jwtToken);
    const firstClub = result.body[0];

    const club = await chai.request(app)
      .get(`/clubs/${firstClub.id}`)
      .set('Authorization', jwtToken);

    expect(club.body).to.haveOwnProperty('id');
    expect(club.body.id).to.be.equals(firstClub.id);
  });
});
