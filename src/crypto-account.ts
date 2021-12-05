import { URLQueryItem } from './request-service/url-request';
import { Base } from './base';
import request from './request-service/request';

export class CryptoAccount extends Base {
    constructor(apiKey, passphrase) {
        super(apiKey, passphrase);
    }

    async getAllAccountsForAProfile() {
        const method = 'GET';
        const requestPath = '/accounts';
        
        this.configureHeaderOptions(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccount(id: number) {
        const method = 'GET';
        const requestPath = `/accounts/account_id/${id}`;

        this.configureHeaderOptions(method, requestPath);

        return request(this.urlRequest.getURLString(),this.options);
    }

    async getSingleAccountHolds(id: number, before?: string, after?: string, limit?: number) {
        const method = 'GET';
        const requestPath = `/accounts/${id}/holds`;

        const queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit)
        ];

        this.configureHeaderOptions(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountLedger(id: number, startDate?: string, endDate?: string, before?: string, after?: string, limit?: number, profileId?: number) {
        const method = 'GET';
        const requestPath = `/accounts/${id}/ledger`;

        const queryItems = [
            new URLQueryItem('start_date', startDate),
            new URLQueryItem('end_date', endDate),
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
            new URLQueryItem('profile_id', profileId)
        ];

        this.configureHeaderOptions(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountTransfer(id: number, before?: string, after?: string, limit?: number, type?: string) {
        const method = 'GET';
        const requestPath = `/accounts/${id}/transfers`;

        const queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
            new URLQueryItem('type', type)
        ];

        this.configureHeaderOptions(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }
}