import CryptoAccount from "../src/crypto-account";
import request from "../src/request";
import allCryptoAccount from "./datas/all-crypto-account";
import singleCryptoAccount from "./datas/single-crypto-account";
import crypto from "crypto-js";

jest.mock("../src/request");
jest.mock("buffer", () => jest.fn());


describe("crypto Account", () => {
    crypto.createHmac = () => {
        return {
            update: () => {
                return {
                    digest: jest.fn()
                };
            }
        };
    };

    const cryptoAccount = new CryptoAccount("anykey", "hello");

    describe("all Accounts", () => {
        test("fetch all crypto accounts", async () => {
            request.mockReturnValue(Promise.resolve(allCryptoAccount));

            cryptoAccount
            .getAllAccountsForAProfile()
            .then(data => expect(data[0].id).toEqual("7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da"));
        });
    });
    
    describe("cingle Account", () => {
        test("fetch single crypto account", async () => {
            request.mockReturnValue(Promise.resolve(singleCryptoAccount));
    
            cryptoAccount
            .getSingleAccount(32)
            .then(data => expect(data.id).toEqual("7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da"));
        });
    });
});
