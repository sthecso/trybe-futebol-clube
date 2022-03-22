import * as chai from 'chai';
import * as sinon from 'sinon';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

const CORRECT_PASSWORD = 'B393u10aED0RQ1N3PAEXQ7';
const INCORRECT_PASSWORD = 'F455u10aED0RQ1N3GFEXH7';
const EMAIL_TEST = 'emaill@test.com';
const EMAIL_ADMIN = 'admin@admin.com';
const EMAIL_BLANK = '';
const PASSWORD_TEST = 'secret_admin';
const PASSWORD_TYPE2_TEST = 'fernando';
const PASSWORD_CORRECT = 'secret_admin';
const ROLE_ADMIN = 'admin';

const ROUTE_LOGIN = '/login';
const ROUTE_LOGIN_VALIDATE = '/login/validate';

/* eslint-disable */
describe('When login is ok', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => sinon.stub(Users, "findOne")
    .resolves({ id: 1, password: CORRECT_PASSWORD, email: EMAIL_TEST, role: ROLE_ADMIN } as Users)
  );

  afterEach(()=>{ (Users.findOne as sinon.SinonStub).restore() })

  it('Return status code 200', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_LOGIN)
      .send({ email: EMAIL_TEST, password: PASSWORD_TEST });
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

describe('When login is not ok', () => {
  let chaiHttpResponse: Response
  beforeEach(async () => {
    sinon.stub(Users, "findOne").resolves(null)
  })
  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore()
  })

  it('Return status code 401', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_LOGIN)
      .send({ email: EMAIL_TEST, password: PASSWORD_TYPE2_TEST });
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});

describe('When login é is not ok, because password is incorrect', () => {
  let chaiHttpResponse: Response;
  beforeEach(async () => {
    sinon.stub(Users, "findOne").resolves({
      id: 1, password: INCORRECT_PASSWORD, email: EMAIL_TEST, role: ROLE_ADMIN,
    } as Users);
  });
  afterEach(()=>{ (Users.findOne as sinon.SinonStub).restore() })

  it('Return status code 401', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_LOGIN)
      .send({ email: EMAIL_TEST, password: PASSWORD_TYPE2_TEST });
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});

describe('When login is not ok, and email is blank.', () => {
  let chaiHttpResponse: Response;
  it('Return status code 401', async () => {
    chaiHttpResponse = await chai.request(app).post(ROUTE_LOGIN)
      .send({ email: EMAIL_BLANK, password: PASSWORD_TYPE2_TEST });
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});

describe('LOGIN Validate Tests', async () => {
  let chaiHttpResponse: Response;
  chaiHttpResponse = await chai.request(app).post(ROUTE_LOGIN)
    .send({ email: EMAIL_ADMIN, password: PASSWORD_CORRECT });
  const token = chaiHttpResponse.body.token

  describe('When token is ok', async () => {
    it('Return status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get(ROUTE_LOGIN_VALIDATE)
        .set({ authorization: token })
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('When token is incorrect', async () => {
    beforeEach(async () => { sinon.stub(Users, "findOne").resolves(null) })
    afterEach(()=>{ (Users.findOne as sinon.SinonStub).restore()} )

    it('Return status code 401', async () => {
      chaiHttpResponse = await chai.request(app).get(ROUTE_LOGIN_VALIDATE)
        .set({ authorization: 'notatoken' })
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('When the token is not exist', async () => {
    it('Return status code 401', async () => {
      chaiHttpResponse = await chai.request(app).get(ROUTE_LOGIN_VALIDATE)
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
});
