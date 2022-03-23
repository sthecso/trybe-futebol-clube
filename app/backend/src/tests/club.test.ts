import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testes relacionados as rotas club", () => {
  describe("Testa a requisição GET/clubs", () => {
    it("Testa se retorna status 200 e um json com os 16 clubes", async () => {
      let getClubs = await chai.request(app).get("/clubs");
      expect(getClubs.status).to.be.equal(200);
      //espero que me retorne 16 times
      expect(getClubs.body).to.be.length(16);
    });
  });

  describe("Testes relacionados as rota GET/clubs/:id", () => {
    it("Testa se retorna o status 200 e um json com um clube", async () => {
      let getClub = await chai.request(app).get("/clubs/3");
      expect(getClub.status).to.be.equal(200);
      // espera me retorna um objeto json
      expect(getClub.body).to.have.an("object");
    });
  });
});
