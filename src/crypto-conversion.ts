import { URLQueryItem } from './request-service/url-request';
import { Base } from './base';
import request from './request-service/request';

export class CryptoConversion extends Base {
    async convertCurrency(from: string, to: string, amount: string, profileId?: string, nonce?: string) {
        const method = 'POST';
        const requestPath = '/conversions';
        const requestBody: CryptoConversion.CurrencyBody = {
            from,
            to,
            amount,
            nonce,
            profile_id: profileId
        };

        this.configureHeaderWithRequestBodyAndQueryParams(method, requestPath, requestBody);
        
        return request(this.urlRequest.getURLString(), this.options);
    }

    async getAConversion(conversionId: string, profileId?: string, path?: {}) {
        const method = 'GET';
        const requestPath = `/conversions/${conversionId}`;
        const queryItems = [
            new URLQueryItem('profile_id', profileId)
        ];

        this.configureHeaderWithRequestBodyAndQueryParams(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }
}

namespace CryptoConversion {
    export interface CurrencyBody {
        from: string,
        to: string,
        amount: string,
        profile_id?: string,
        nonce?: string
    }
}