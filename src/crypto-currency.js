import request from "./request";

export default class CryptoCurrency {
    constructor() {
        this.options = { method: "GET", headers: { Accept: "application/json" } };
    }

    async getAll() {
        return request("https://api.exchange.coinbase.com/currencies", this.options);
    }

    async get(currencyId) {
        return request(`https://api.exchange.coinbase.com/currencies/${currencyId}`, this.options);
    }
}