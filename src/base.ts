import { Buffer } from 'buffer';
import URLRequest from './url-request';
import crypto from 'crypto-js';

export default class Base {
    urlRequest: URLRequest = new URLRequest();
    options = {
        method: '',
        headers: {
            Accept: 'application/json'
        }
    };
    
    constructor(apiKey, passphrase) {
        this.urlRequest.scheme = 'https';
        this.urlRequest.host = 'api.exchange.coinbase.com';

        if (apiKey !== undefined) {
            this.options.headers['cb-access-key'] = apiKey;
        }

        if (passphrase !== undefined) {
            this.options.headers['cb-access-passphrase'] = passphrase;
        }
    }

    configureHeaderOptions(method, timestamp, requestPath) {
        if (timestamp !== undefined) {
            const secret = 'fearofbeingmissingout';
            const message = `${timestamp}${method}${requestPath}`;

            const key = Buffer.from(secret, 'base64');
            const hmac = crypto.createHmac('sha256', key);
            const cbAccessSign = hmac.update(message).digest('base64');

            this.options.headers['cb-access-sign'] = cbAccessSign;
            this.options.headers['cb-access-timestamp'] = timestamp;
        }
        
        this.configureHeader(method, requestPath);
    }

    configureHeader(method, requestPath) {
        this.options.method = method;
        this.urlRequest.path = requestPath;
    }
}