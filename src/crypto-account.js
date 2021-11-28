import crypto from 'crypto-js';
import buffer from 'buffer';
import request from './request';

export default class CryptoAccount {
    constructor(apiKey, passphrase) {
        this.apiKey = apiKey;
        this.passphrase = passphrase;
        this.options = {
            headers: {
              Accept: 'application/json',
              'cb-access-key': `${this.apiKey}`,
              'cb-access-passphrase': this.passphrase,
            }  
        };
        
        this.configureHeaderOptions = (method, timestamp, requestPath) => {
            const secret = 'fearofbeingmissingout';
            const message = timestamp + method + requestPath;

            const key = buffer(secret, 'base64');
            const hmac = crypto.createHmac('sha256', key);
            const cbAccessSign = hmac.update(message).digest('base64');


            this.options.headers['cb-access-sign'] = cbAccessSign;
            this.options.headers['cb-access-timestamp'] = timestamp;
            this.options.method = method;
            return cbAccessSign;
        };
    }

    async getAllAccountsForAProfile() {
        const timestamp = Date.now();
        const method = 'GET';
        const requestPath = '/accounts';

        this.configureHeaderOptions(method, timestamp, requestPath);

        return request('https://api.exchange.coinbase.com/accounts', this.options);
    }

    async getSingleAccount(id) {
        const timestamp = Date.now();
        const method = 'GET';
        const requestPath = '/accounts/account_id';

        this.configureHeaderOptions(method, timestamp, requestPath);

        return request(`https://api.exchange.coinbase.com/accounts/account_id/${id}`, this.options);
    }
}