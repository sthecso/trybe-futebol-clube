import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração da rota /clubs", () => {

  let chaiHttpResponse: Response;
  const allTeams = 16

  it("Verifica se ao chama a rota retorne 200", async () => {
    chaiHttpResponse = await chai.request(app).get("/clubs");

    expect(chaiHttpResponse).have.status(200)
  });

  it("Verifica se ao chama a rota retorne um json com todos times", async () => {
    chaiHttpResponse = await chai.request(app).get("/clubs");

    expect(chaiHttpResponse.body).to.have.lengthOf(allTeams);
  });
  it("Verifica se ao chama a rota com uma Id ele retorna objeto", async () => {
    const team = {
      id: 3,
      clubName: "Botafogo"
    }
    chaiHttpResponse = await chai.request(app).get("/clubs/3");

    expect(chaiHttpResponse.body).to.deep.equal(team);
  });
});
