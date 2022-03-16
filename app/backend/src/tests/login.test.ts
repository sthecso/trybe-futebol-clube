import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  const mockUserPost = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };

  const mockToken = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';

  before(async () => {
    sinon
      .stub(User, 'create')
      .resolves(mockUserPost as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });

  it('...', async () => {
    await chai
       .request(app)
       .post('/login')
       .send({
         email: 'stringEmail',
         password: 'stringPasscode',
       })
       .end((err, res) => {
         expect(err).to.be.null;
         expect(res).to.have.status(200);
         expect(res.body.user).to.be.eql(mockUserPost);
         expect(res.body.token).to.be.eql(mockToken);
       });
  });
});
