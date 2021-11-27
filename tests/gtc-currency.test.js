import CryptoCurrency from "../src/crypto-currency";
import data from "./datas/gtc-currency";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
);

describe("gtc currency", () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    
    test("fetch gtc currency", () => {
        const crypto = new CryptoCurrency();
        return crypto.getAll().then(data => {
            expect(data.id).toEqual("GTC")
        });
    });
});
