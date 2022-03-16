import * as chai from "chai";
import { expect } from "chai";
import Token from "../auth/Token";

describe("Teste Unitário Token", () => {

  const payload = {
    sub: "1234567890",
    name: "John Doe",
    iat: 1516239022,
  };

  it("Testa se a função generate", () => {
    const token = Token.generate(payload);
    const result = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\
.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ\
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    expect(result).to.equal(token);
  });

  it("Testa se a função verify", () => {
    const result = Token.verify("token");
    expect(payload).to.deep.equal(result);
  });
});
