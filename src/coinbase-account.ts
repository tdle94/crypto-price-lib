import Base from './base';
import request from './request';

export default class CoinbaseAccount extends Base {
    async getAllCoinbaseWallets() {
        const method = 'GET';
        const requestPath = '/coinbase-accounts';
        const timestamp = Date.now();

        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async generateCryptoAddress(id) {
        const method = 'POST';
        const requestPath = `/coinbase-accounts/${id}/addresses`;
        const timestamp = Date.now();

        this.configureHeaderOptions(method, timestamp, requestPath);
        
        return request(this.urlRequest.getURLString(), this.options);
    }
}