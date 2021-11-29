import request from './request';
import Base from './base';
import { URLQueryItem } from './url-request';

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

    async getSingleAccount(id) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/account_id/${id}`;

        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(this.urlRequest.getURLString(),this.options);
    }

    async getSingleAccountHolds(id, before, after, limit) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/holds`;

        this.urlRequest.queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
        ];
        
        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountLedger(id, startDate, endDate, before, after, limit, profileId) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/ledger`;

        this.urlRequest.queryItems = [
            new URLQueryItem('start_date', startDate),
            new URLQueryItem('end_date', endDate),
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
            new URLQueryItem('profile_id', profileId),
        ];

        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountTransfer(id, before, after, limit, type) {
        const method = 'GET';
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/transfers`;

        this.urlRequest.queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
            new URLQueryItem('type', type),
        ];

        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }
}