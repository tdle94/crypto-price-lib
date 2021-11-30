import { URLQueryItem } from './url-request';
import request from './request';
import Base from './base';

export default class CryptoConversion extends Base {
    async convertCurrency(from: string, to: string, amount: string, profileId?: string, nonce?: string) {
        const method = 'POST';
        const timestamp = Date.now();
        const requestPath = `/conversions`;

        this.configureHeaderOptions(method, timestamp, requestPath);

        const requestBody: CryptoConversion.ConvertCurrencyBody = {
            from,
            to,
            amount,
            nonce,
            profile_id: profileId
        }

        this.options.body = JSON.stringify(requestBody);
        this.options.headers['Content-Type'] = 'application/json';
        
        return request(this.urlRequest.getURLString(), this.options);
    }

    async getAConversion(conversionId: string, profileId?: string) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/conversions/${conversionId}`;

        this.configureHeaderOptions(method, timestamp, requestPath);

        this.urlRequest.queryItems = [
            new URLQueryItem('profile_id', profileId)
        ]

        return request(this.urlRequest.getURLString(), this.options);
    }
}

namespace CryptoConversion {
    export interface ConvertCurrencyBody {
        from: string,
        to: string,
        amount: string,
        profile_id?: string,
        nonce?: string
    }
}