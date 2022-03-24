import * as chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Login", () => {
  describe("Rota POST /login", () => {
    let chaiHttpResponse: Response;

    it("Testa se retorna o status 200, quando passamos um body válido", async () => {
      const login = {
        email: "admin@admin.com",
        password: "secret_admin",
      };

      chaiHttpResponse = await chai.request(app).post("/login").send(login);

      const { user, token } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(token).not.to.be.undefined;
      expect(user.email).to.be.equal("admin@admin.com");
    });
    it('Testa se quando o email é invalido retorna a mensagem o status 401', async () => {
      const login = {
        email: "iamnotadmin@admin.com",
        password: "secret_admin",
      };

      chaiHttpResponse = await chai.request(app).post("/login").send(login);

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal("Incorrect email or password");
    });
    it("Testa se quando o password é invalido retorna a mensagem o status 401", async () => {
      const login = {
        email: "admin@admin.com",
        password: "wrongpassword",
      };

      chaiHttpResponse = await chai.request(app).post("/login").send(login);

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal("Incorrect email or password");
    });
    it('testa quando o email não é passado retorna 401', async () => {
      const login = {
        email: "",
        password: "secret_admin",
      };

      chaiHttpResponse = await chai.request(app).post("/login").send(login);

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });
    it("testa quando o password não é passado retorna 401", async () => {
      const login = {
        email: "",
        password: "secret_admin",
      };

      chaiHttpResponse = await chai.request(app).post("/login").send(login);

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal("All fields must be filled");
    });
  });
});
