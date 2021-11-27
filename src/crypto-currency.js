export default class CryptoCurrency {
    async getAll() {
        const options = { method: "GET", headers: { Accept: "application/json" } };

        return await fetch("https://api.exchange.coinbase.com/currencies", options)    
        .then(response => response.json());
    }

    async get(currencyId) {
        const options = {method: "GET", headers: {Accept: "application/json"}};

        return await fetch(`https://api.exchange.coinbase.com/currencies/${currencyId}`, options)
        .then(response => response.json());
    }
}