// npm run test:browser
// npm run test:debug
// compose:up | compose:down

import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import clubs from '../database/models/clubs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Migration e Model da tabela clubs', () => {
  const teams = [{
    id: 1,
    club_name: 'Bahia'
  }, {
    id: 2,
    club_name: 'Cruzeiro'
  }
]
  
  before( async () => {
    sinon.stub(clubs, 'getAll').resolves(teams);
  });

  it('Verifica se a ')
  
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
