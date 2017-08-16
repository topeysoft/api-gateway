import { BaseException } from "./";

describe("BaseException", () => {
  it("should implement all required methods", () => {
      const message ='this is a test';
    expect(BaseException["throw"]).toBeTruthy();
    expect(()=>{BaseException.throw(message)}).toThrow(new BaseException(message));
  });
});