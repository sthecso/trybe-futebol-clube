import { assert, expect } from "chai";
import Token from "../auth/Token";

describe("Teste Unitário classe Token", async () => {
  const payload = {
    "sub": "1234567890",
    "name": "John Doe",
  };

  it("Testa se a função generate existe", () => {
       
    assert.isFunction(Token.generate)
  });

  it("Testa a função verify e generate gera e verifica o token", async () => {
    const token = await Token.generate(payload)
    const result = await Token.verify(token);
    
    expect(result).to.include(payload);
  });
});
