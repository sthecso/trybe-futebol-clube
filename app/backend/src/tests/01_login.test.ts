import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";
import UserModel from "../database/models/User";

import { Response } from "superagent";
import jwtHelper from "../helpers/jwtHelper";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa o endpoint de login", () => {
  let chaiHttpResponse: Response;
  const usersMock = require("./expected_results/trybe_football_club").users;

  const adminUser = usersMock[0];

  // before(async () => {
  //   sinon
  //     .stub(UserModel, "findOne")
  //     .resolves(adminUser);
  // });

  // after(()=>{
  //   (UserModel.findOne as sinon.SinonStub).restore();
  // })
  describe('1) Ao digitar os dados de login corretos', () => {
    it("responde com status 200, o token e os dados do usuário", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: "admin@admin.com", password: "secret_admin" });
  
      const { user, token } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(token).not.to.be.undefined;
      expect(user.role).to.be.equal(adminUser.role);
      expect(user.username).to.be.equal(adminUser.username);
      expect(user.email).to.be.equal(adminUser.email);
      expect(user.password).to.be.undefined;
    });
  });

  describe('2) Ao digitar uma senha incorreta', () => {
    it("responde com status 401 e a mensagem 'Incorrect email or password'", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: "admin@admin.com", password: "wrong_pass" });
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal("Incorrect email or password");
    });

  })
});

describe("Testa o endpoint validate", () => {
  let chaiHttpResponse: Response;

  describe('1) Ao passar um token válido', async () => {
    before(async () => {
      sinon.stub(jwtHelper, "verify").returns({ role: "admin" });
    });

    after(() => {
      (jwtHelper.verify as sinon.SinonStub).restore();
    });

    it("Responde com status 200 e a role correta", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set("authorization", "validloginToken");
  
      const role = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(role).to.be.equal("admin");
    });
  });

  describe('2) Ao passar um token inválido', () => {
    it("responde com a mensagem 'Invalid token format'", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/login/validate")
        .set("authorization", "invalidloginToken");
  
      const { message } = chaiHttpResponse.body;
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(message).to.be.equal("Invalid token format");
    });
  })
});
