import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /clubs', () => {
//   const userEmail = 'user@user.com';
//   const userPass = 'secret_user';
  let jwtToken: string;

//   before(async () => {
//     const login = {
//       email: userEmail,
//       password: userPass,
//     };
//     const result = await chai.request(app)
//       .post('login')
//       .set('content-type', 'application/json')
//       .send(login);

//     expect(result.body).to.haveOwnProperty('token');
//     const { token } = result.body;
//     jwtToken = token;
//   });
  it ('Deve ter o Status 200', async () => {
    const result = await chai.request(app)
      .get('/clubs')
      .set('Authorization', jwtToken);
    expect(result.body).to.be.equals(200);
  });
  it ('Deveria retornar uma lista de clubs', async () => {
    const result = await chai.request(app)
      .get('clubs')    
      .set('Authorization', jwtToken)
    expect(Array.isArray(result.body)).to.be.equals(true);
  });
  it('Deveria retornar somente um club', async () => {
    const result = await chai.request(app)
      .get('/clubs')
      .set('Authorization', jwtToken);
    const idClub = result.body[0];

    const club = await chai.request(app)
      .get(`/clubs/${idClub}`)
      .set('Authorization', jwtToken);
    expect(club).to.haveOwnProperty('id');
    expect(club.body.id).to.be.equal(idClub.id);
  });
});