import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testa se o endpoint login retorna dados esperados", () => {
  it("Testa se retorna status 200 e usuario tem um token", async () => {
    const loginTest = await chai.request(app).post("/login").send({
      username: "Admin",
      password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
    });
    expect(loginTest.status).to.be.equal(200);
    expect(loginTest.body).to.be.property("token");
  });

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
  it("Seu sub-teste", () => {
    expect(false).to.be.eq(true);
  });
});
