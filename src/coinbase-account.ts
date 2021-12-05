import { Base } from './base';
import request from './request-service/request';

export class CoinbaseAccount extends Base {
    async getAllCoinbaseWallets() {
        const method = 'GET';
        const requestPath = '/coinbase-accounts';

        this.configureHeaderWithRequestBodyAndQueryParams(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async generateCryptoAddress(id: number) {
        const method = 'POST';
        const requestPath = `/coinbase-accounts/${id}/addresses`;

        this.configureHeaderWithRequestBodyAndQueryParams(method, requestPath);
        
        return request(this.urlRequest.getURLString(), this.options);
    }
}