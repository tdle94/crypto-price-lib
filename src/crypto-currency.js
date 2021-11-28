export default class CryptoCurrency {
    constructor() {
        this.options = { method: "GET", headers: { Accept: "application/json" } };
    }

    async getAll() {
        try {
            return await fetch("https://api.exchange.coinbase.com/currencies", this.options)    
            .then(response => response.json());
        } catch (error) {
            return Promise.reject(Error(error));
        }
    }

    async get(currencyId) {
        try {
            return await fetch(`https://api.exchange.coinbase.com/currencies/${currencyId}`, this.options)
            .then(response => response.json());
        } catch (error) {
            return Promise.reject(Error(error));
        }
    }
}