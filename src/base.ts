import { Buffer } from 'buffer';
import URLRequest, { URLQueryItem } from './request-service/url-request';
import crypto from 'crypto';
import RequestOptions from './request-service/url-request-option';

export class Base {
    urlRequest: URLRequest = new URLRequest();
    apiKey: string;
    passphrase: string;
    options: RequestOptions = {
        method: '',
        headers: {
            Accept: 'application/json'
        }
    };
    
    constructor(apiKey?: string, passphrase?: string, env: Base.Environment = Base.Environment.Sandbox) {
        this.urlRequest.scheme = 'https';
        this.urlRequest.host = env;
        this.apiKey = apiKey;
        this.passphrase = passphrase;
    }

    configureHeaderWithRequestBodyAndQueryParams(method: string, requestPath: string, requestBody: {} = {}, urlQueryItems: URLQueryItem[] = []) {
        const timestamp = Date.now()
        
        this.configureBasicHeader(method, requestPath);

        this.urlRequest.queryItems = urlQueryItems;
        
        if (requestBody !== undefined && requestBody !== null && Object.keys(requestBody).length > 0) {
            this.options.body = JSON.stringify(requestBody);
            this.options.headers['Content-Type'] = 'application/json';
        }

        if (this.apiKey !== undefined && this.apiKey !== null) {
            this.options.headers['cb-access-key'] = this.apiKey;
        }

        if (this.passphrase !== undefined && this.passphrase !== null) {
            this.options.headers['cb-access-passphrase'] = this.passphrase;
        }


        const secret = 'fearofbeingmissingout';
        const message = `${timestamp}${method}${requestPath}`;

        const key = Buffer.from(secret, 'base64');
        const hmac = crypto.createHmac('sha256', key);
        const cbAccessSign = hmac.update(message).digest('base64');

        this.options.headers['cb-access-sign'] = cbAccessSign;
        this.options.headers['cb-access-timestamp'] = timestamp;

    }

    configureBasicHeader(method: string, requestPath: string) {
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

export namespace Base {
    export enum Environment {
        Sandbox = 'api-public.sandbox.exchange.coinbase.com',
        Production = 'api.exchange.coinbase.com'
    }
}