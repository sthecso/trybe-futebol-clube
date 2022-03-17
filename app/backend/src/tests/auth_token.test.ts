import { assert, expect } from "chai";
import Token from "../auth/Token";

describe("Teste Unitário Token", () => {
  const payload = {
    "sub": "1234567890",
    "name": "John Doe",
  };

  it("Testa se a função generate existe", () => {
       
    assert.isFunction(Token.generate)
  });

  it("Testa se a função verify", () => {
    const token = Token.generate(payload)
    const result = Token.verify(token);
    console.log(result);
    
    expect(result).to.include(payload);
  });
});
