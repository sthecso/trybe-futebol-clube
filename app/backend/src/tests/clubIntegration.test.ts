import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de Integração da rota /clubs", () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

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
  const allTeams = [
    {
      id: 1,
      clubName: "Avaí/Kindermann",
    },
    {
      id: 2,
      clubName: "Bahia",
    },
    {
      id: 3,
      clubName: "Botafogo",
    },
  ];

  it("Verifica se ao chama a rota retorne 200", async () => {
    chaiHttpResponse = await chai.request(app).get("/clubs");

    expect(chaiHttpResponse).have.status(200)
  });

  it("Verifica se ao chama a rota retorne um json com todos times", async () => {
    chaiHttpResponse = await chai.request(app).get("/clubs");

    expect(chaiHttpResponse.body).to.deep.equal(allTeams);
  });
});
