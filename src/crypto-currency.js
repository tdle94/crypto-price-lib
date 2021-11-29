import request from './request';
import URLRequest from './url-request';

export default class CryptoCurrency {
    constructor() {
        this.options = { method: 'GET', headers: { Accept: 'application/json' } };
        this.urlRequest = new URLRequest();
        this.urlRequest.scheme = 'https';
        this.urlRequest.host = 'api.exchange.coinbase.com';
    }

    async getAll() {
        this.urlRequest.path = '/currencies';
        return request(this.urlRequest.getURLString(), this.options);
    }

    async get(currencyId) {
        this.urlRequest.path = `/currencies/${currencyId}`;
        return request(this.urlRequest.getURLString(), this.options);
    }
}