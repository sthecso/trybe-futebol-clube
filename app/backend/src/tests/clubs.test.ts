import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";
import {IClub}  from "../interfaces/IClub";

chai.use(chaiHttp);

const { expect } = chai;

describe("Tests GET /clubs route", () => {
  it("Return status 200 with an array containing all clubs", async () => {
    return chai
      .request(app)
      .get("/clubs")
      .then((res: Response) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an("array");
        res.body.forEach((club: IClub) => {
          expect(club).to.have.property("id");
          expect(club).to.have.property("clubName");
        });
      });
  });
});
describe("Tests GET /clubs/:id route", () => {
  it("Return status 200 with the club", async () => {
    return chai
      .request(app)
      .get("/clubs/1")
      .then((res: Response) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("clubName");
      });
  });
});
