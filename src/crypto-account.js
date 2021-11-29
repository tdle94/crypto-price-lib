import crypto from 'crypto-js';
import buffer from 'buffer';
import request from './request';
import URLRequest, { URLQueryItem } from './url-request';

export default class CryptoAccount {
    constructor(apiKey, passphrase) {
        this.apiKey = apiKey;
        this.passphrase = passphrase;
        this.urlRequest = new URLRequest();
        this.urlRequest.scheme = 'https';
        this.urlRequest.host = 'api.exchange.coinbase.com';
        this.options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'cb-access-key': `${this.apiKey}`,
              'cb-access-passphrase': this.passphrase,
            }  
        };
        
        this.configureHeaderOptions = (timestamp, requestPath) => {
            const secret = 'fearofbeingmissingout';
            const message = `${timestamp}GET${requestPath}`;

            const key = buffer(secret, 'base64');
            const hmac = crypto.createHmac('sha256', key);
            const cbAccessSign = hmac.update(message).digest('base64');


            this.options.headers['cb-access-sign'] = cbAccessSign;
            this.options.headers['cb-access-timestamp'] = timestamp;

            this.urlRequest.path = requestPath;

            return cbAccessSign;
        };
    }

    async getAllAccountsForAProfile() {
        const timestamp = Date.now();
        const requestPath = '/accounts';

        this.configureHeaderOptions(timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccount(id) {
        const timestamp = Date.now();
        const requestPath = `/accounts/account_id/${id}`;

        this.configureHeaderOptions(timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountHolds(id, before, after, limit) {
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/holds`;

        this.urlRequest.queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
        ];
        
        this.configureHeaderOptions(timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountLedger(id, startDate, endDate, before, after, limit, profileId) {
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

        this.configureHeaderOptions(timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getSingleAccountTransfer(id, before, after, limit, type) {
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/transfers`;

        this.urlRequest.queryItems = [
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('limit', limit),
            new URLQueryItem('type', type),
        ];

        this.configureHeaderOptions(timestamp, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }
}