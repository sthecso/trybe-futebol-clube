import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('A requisição POST/login deve retornar os dados esperados ',() => {
  it('espero que tenha os status 200 e que tenha um token ',async () => {
    let loginResponse = await chai.request(app)
     .post('/login')
     .send({ 
       username: 'User',
       password:'$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
     });
     expect(loginResponse).to.have.status(200);
     expect(loginResponse.body).to.have.property("token")
  });
});
