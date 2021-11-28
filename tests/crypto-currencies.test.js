import CryptoCurrency from "../src/crypto-currency";
import gtcData from "./datas/gtc-currency";
import cryptoData from "./datas/crypto-currency";

jest.mock("../src/crypto-currency");

describe("all crypto currencies", () => {
    beforeEach(() => {
        CryptoCurrency.mockImplementation(() => {
          return {
              getAll: () => {
                  return Promise.resolve(cryptoData);
              }
          };
      });
    });
    
    test("fetch all crypto currencies available", () => {
        const crypto = new CryptoCurrency();
        return crypto.getAll().then(data => {
            expect(data[0].id).toEqual("DASH");
        });
    });
});

describe("gtc currency", () => {
  beforeEach(() => {
      CryptoCurrency.mockImplementation(() => {
          return {
              get: () => {
                  return Promise.resolve(gtcData);
              }
          };
      });
  });
  
  test("fetch gtc currency", () => {
      const crypto = new CryptoCurrency();
      return crypto.get("GTC").then(data => {
          expect(data.id).toEqual("GTC");
      });
  });
});