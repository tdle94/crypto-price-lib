export default class CryptoCurrency {
    async getAll() {
        const options = { method: "GET", headers: { Accept: "application/json" } };

        try {
            return await fetch("https://api.exchange.coinbase.com/currencies", options)    
            .then(response => response.json());
        } catch (error) {
            return Promise.reject(Error(error));
        }
    }

    async get(currencyId) {
        const options = {method: "GET", headers: {Accept: "application/json"}};

        try {
            return await fetch(`https://api.exchange.coinbase.com/currencies/${currencyId}`, options)
            .then(response => response.json());
        } catch (error) {
            return Promise.reject(Error(error));
        }
    }
}