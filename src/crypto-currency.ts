import request from './request-service/request';
import { Base } from './base';

export class CryptoCurrency extends Base {
    async getAll() {
        const requestPath = '/currencies';
        const method = 'GET';

        super.configureBasicHeader(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async get(currencyId: string) {
        const requestPath = `/currencies/${currencyId}`;
        const method = 'GET';

        super.configureBasicHeader(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }
}