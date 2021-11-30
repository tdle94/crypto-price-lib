import { URLQueryItem } from './url-request';
import request from './request';
import Base from './base';

export default class CryptoAccount extends Base {
    constructor(apiKey, passphrase) {
        super(apiKey, passphrase);
    }

    async getAllAccountsForAProfile() {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = '/accounts';
        
        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccount(id: number) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/account_id/${id}`;

        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(this.urlRequest.getURLString(),this.options);
    }

    async getSingleAccountHolds(id: number, before?: string, after?: string, limit?: number) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/holds`;

        this.configureHeaderOptions(method, timestamp, requestPath);

        this.urlRequest.queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
        ];

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountLedger(id: number, startDate?: string, endDate?: string, before?: string, after?: string, limit?: number, profileId?: number) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/ledger`;

        this.configureHeaderOptions(method, timestamp, requestPath);

        this.urlRequest.queryItems = [
            new URLQueryItem('start_date', startDate),
            new URLQueryItem('end_date', endDate),
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
            new URLQueryItem('profile_id', profileId),
        ];

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountTransfer(id: number, before?: string, after?: string, limit?: number, type?: string) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/transfers`;

        this.configureHeaderOptions(method, timestamp, requestPath);

        this.urlRequest.queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
            new URLQueryItem('type', type),
        ];

        return request(this.urlRequest.getURLString(), this.options);
    }
}