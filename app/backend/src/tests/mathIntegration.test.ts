import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração da rota /matchs", () => {

  let chaiHttpResponse: Response;
  let allMatchs = 48

  it("Verifica se ao chama a rota retorne 200", async () => {
    chaiHttpResponse = await chai.request(app).get("/matchs");

    expect(chaiHttpResponse).have.status(200)
  });

  it("Verifica se ao chama a rota retorne um json com todos maths", async () => {
    chaiHttpResponse = await chai.request(app).get("/matchs");

    expect(chaiHttpResponse.body).to.have.lengthOf(allMatchs);
  });

  it("Verifica se ao chama a rota com query string inProgress=true", async () => {
    chaiHttpResponse = await chai.request(app).get("/matchs?inProgress=true");
    allMatchs = 8

    expect(chaiHttpResponse.body).to.have.lengthOf(allMatchs);
  });

  it("Verifica se ao chama a rota com query string inProgress=false", async () => {
    chaiHttpResponse = await chai.request(app).get("/matchs?inProgress=false");
    allMatchs = 40

    expect(chaiHttpResponse.body).to.have.lengthOf(allMatchs);
  });

});
