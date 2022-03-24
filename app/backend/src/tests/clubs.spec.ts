import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const standardMessage = 'Locked and loaded, little lizard!!!';

describe('Verifica se os clubes aparecem na página', () => {
  it('Retorna uma lista de clubes com sucesso', async () => {
    const response = await chai.request(app).get('/clubs');
    const club = response.body[5];
    console.log(club);
    expect(response.body.message).not.to.be.equal(standardMessage);
    expect(response).to.have.status(200);
    expect(response).to.be.an('object');
    expect(response).to.have.lengthOf(16);
    expect(club).not.to.be.undefined;
    expect(club).to.have.property('id').that.is.a('number');
    expect(club).to.have.property('clubName').that.is.a('string');
  });
});
