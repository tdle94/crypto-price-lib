import { Buffer } from 'buffer';
import { URLQueryItem as queryItems } from './url-request';
import URLRequest from './url-request';
import crypto from 'crypto-js';
import RequestOptions from './url-request-option';

export default class Base {
    urlRequest: URLRequest = new URLRequest();
    apiKey: string;
    passphrase: string;
    options: RequestOptions = {
        method: '',
        headers: {
            Accept: 'application/json'
        }
    };
    
    constructor(apiKey?: string, passphrase?: string) {
        this.urlRequest.scheme = 'https';
        this.urlRequest.host = 'api.exchange.coinbase.com';
        this.apiKey = apiKey;
        this.passphrase = passphrase;
    }

    configureHeaderOptions(method: string, timestamp: number, requestPath: string, urlQueryItems: queryItems[] = []) {

        this.configureHeader(method, requestPath);

        this.urlRequest.queryItems = urlQueryItems;

        if (this.apiKey !== undefined) {
            this.options.headers['cb-access-key'] = this.apiKey;
        }

        if (this.passphrase !== undefined) {
            this.options.headers['cb-access-passphrase'] = this.passphrase;
        }

        if (timestamp !== undefined) {
            const secret = 'fearofbeingmissingout';
            const message = `${timestamp}${method}${requestPath}`;

            const key = Buffer.from(secret, 'base64');
            const hmac = crypto.createHmac('sha256', key);
            const cbAccessSign = hmac.update(message).digest('base64');

            this.options.headers['cb-access-sign'] = cbAccessSign;
            this.options.headers['cb-access-timestamp'] = timestamp;
        }
    }

    configureHeader(method: string, requestPath: string) {
        this.urlRequest.queryItems = [];
        this.urlRequest.path = requestPath;
        this.options = {
            method,
            headers: {
                Accept: 'application/json'
            }
        };
    }
}