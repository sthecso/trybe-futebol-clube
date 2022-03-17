import { assert, expect } from "chai";
import Token from "../auth/Token";

describe("Teste Unitário Token", async () => {
  const payload = {
    "sub": "1234567890",
    "name": "John Doe",
  };

  it("Testa se a função generate existe", () => {
       
    assert.isFunction(Token.generate)
  });

  it("Testa se a função verify", async () => {
    const token = await Token.generate(payload)
    const result = await Token.verify(token);
    
    expect(result).to.include(payload);
  });
});
