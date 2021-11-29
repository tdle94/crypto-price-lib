import { Buffer } from 'buffer';
import URLRequest from './url-request';
import crypto from 'crypto-js';
import RequestOptions from './url-request-option';

export default class Base {
    urlRequest: URLRequest = new URLRequest();
    options: RequestOptions = {
        method: '',
        headers: {
            Accept: 'application/json'
        }
    }
    
    constructor(apiKey: string, passphrase: string) {
        this.urlRequest.scheme = 'https';
        this.urlRequest.host = 'api.exchange.coinbase.com';

        if (apiKey !== undefined) {
            this.options.headers['cb-access-key'] = apiKey;
        }

        if (passphrase !== undefined) {
            this.options.headers['cb-access-passphrase'] = passphrase;
        }
    }

    configureHeaderOptions(method: string, timestamp: number, requestPath: string) {
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

    configureHeader(method: string, requestPath: string) {
        this.options.method = method;
        this.urlRequest.path = requestPath;
    }
}