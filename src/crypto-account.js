import crypto from 'crypto-js';
import buffer from 'buffer';
import request from './request';

export default class CryptoAccount {
    constructor(apiKey, passphrase) {
        this.apiKey = apiKey;
        this.passphrase = passphrase;
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

            return cbAccessSign;
        };
    }

    async getAllAccountsForAProfile() {
        const timestamp = Date.now();
        const requestPath = '/accounts';

        this.configureHeaderOptions(timestamp, requestPath);

        return request('https://api.exchange.coinbase.com/accounts', this.options);
    }

    async getSingleAccount(id) {
        const timestamp = Date.now();
        const requestPath = '/accounts/account_id';

        this.configureHeaderOptions(timestamp, requestPath);

        return request(`https://api.exchange.coinbase.com/accounts/account_id/${id}`, this.options);
    }

    async getSingleAccountHolds(id, before, after, limit) {
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/holds`;

        var link = `https://api.exchange.coinbase.com/accounts/${id}/holds`;

        if (before !== undefined) {
            link = `${link}?before=${before}`;
        }

        if (after !== undefined) {
            link = `${link}&after=${after}`;
        }

        if (limit !== undefined) {
            link = `${link}&limit=${limit}`;
        }
        
        this.configureHeaderOptions(timestamp, requestPath);

        return request(link, this.options);
    }

    async getSingleAccountLedger(id, startDate, endDate, before, after, limit, profileId) {
        const timestamp = Date.now();
        const requestPath = `/accounts/${id}/ledger`;

        var link = `https://api.exchange.coinbase.com/accounts/${id}/ledger`;

        if (startDate !== undefined) {
            link = `${link}?start_date=${startDate}`;
        }

        if (endDate !== undefined) {
            link = `${link}&end_date=${endDate}`;
        }

        if (before !== undefined) {
            link = `${link}&before=${before}`;
        }

        if (after !== undefined) {
            link = `${link}&after=${after}`;
        }

        if (limit !== undefined) {
            link = `${link}&start_date=${limit}`;
        }

        if (profileId !== undefined) {
            link = `${link}&profile_id=${profileId}`;
        }

        this.configureHeaderOptions(timestamp, requestPath);

        return request(link, this.options);
    }

    async getSingleAccountTransfer(id, before, after, limit, type) {
        const timestamp = Date().now;
        const requestPath = `/accounts/${id}/transfers`;

        var link = `https://api.exchange.coinbase.com/accounts/${id}/transfers`;

        if (before !== undefined) {
            link = `${link}?before=${before}`;
        } 

        if (after !== undefined) {
            link = `${link}&after=${after}`;
        }

        if (limit !== undefined) {
            link = `${link}&limit=${limit}`;
        }

        if (type !== undefined) {
            link = `${link}&type=${type}`;
        }

        this.configureHeaderOptions(timestamp, requestPath);

        return request(link, this.options);
    }
}