import { URLQueryItem } from './url-request';
import request from './request';
import Base from './base';

export default class CryptoConversion extends Base {
    async convertCurrency(from: string, to: string, amount: string, profileId?: string, nonce?: string) {
        const method = 'POST';
        const timestamp = Date.now();
        const requestPath = '/conversions';
        const requestBody: CryptoConversion.ConvertCurrencyBody = {
            from,
            to,
            amount,
            nonce,
            profile_id: profileId
        };

        this.configureHeaderOptions(method, timestamp, requestPath, requestBody);
        
        return request(this.urlRequest.getURLString(), this.options);
    }

    async getAConversion(conversionId: string, profileId?: string, path?: {}) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/conversions/${conversionId}`;
        const queryItems = [
            new URLQueryItem('profile_id', profileId)
        ];

        this.configureHeaderOptions(method, timestamp, requestPath, {}, queryItems);

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