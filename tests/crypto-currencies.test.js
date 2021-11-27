import CryptoCurrency from "../src/crypto-currency";
import data from "./datas/crypto-currency";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
);

describe("all crypto currencies", () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    
    test("fetch all crypto currencies available", () => {
        const crypto = new CryptoCurrency();
        return crypto.getAll().then(data => {
            expect(data[0].id).toEqual("DASH")
        });
    });
});

