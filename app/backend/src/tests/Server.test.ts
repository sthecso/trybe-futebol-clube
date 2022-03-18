import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

// tests the server
describe("Server", () => {
  it("Deve retornar status 200", async () => {
    const response: Response = await chai.request(app).get("/");
    expect(response.status).to.be.equal(200);
  });
});
