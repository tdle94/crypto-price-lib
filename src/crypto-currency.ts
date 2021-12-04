import request from './request';
import { Base } from './base';

export default class CryptoCurrency extends Base {
    async getAll() {
        const requestPath = '/currencies';
        const method = 'GET';

        super.configureHeader(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async get(currencyId: string) {
        const requestPath = `/currencies/${currencyId}`;
        const method = 'GET';

        super.configureHeader(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }
}