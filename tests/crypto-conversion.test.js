import { Buffer } from 'buffer';
import CryptoConversion from '../src/crypto-conversion';
import request from '../src/request';
import convertCurrency from './datas/convert-currency';
import getCryptoConversion from './datas/get-crypto-conversion';
import crypto from 'crypto-js';

jest.mock('../src/request');
jest.mock('Buffer', () => jest.fn());

Date.now = jest.fn(() => 1487076708000);

describe('crypto conversion', () => {
    crypto.createHmac = () => {
        return {
            update: () => {
                return {
                    digest: jest.fn()
                };
            }
        };
    };

    Buffer.from = jest.fn();

    const cryptoConversion = new CryptoConversion('what', 'yay');

    describe('convert currency', () => {
        test('convert currency with all required body params', () => {
            request.mockReturnValue(Promise.resolve(convertCurrency));

            cryptoConversion
            .convertCurrency('BTC', 'ETH', '1')
            .then(data => {
                expect(request).toHaveBeenCalledWith('https://api.exchange.coinbase.com/conversions', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'cb-access-key': 'what',
                      'cb-access-passphrase': 'yay',
                      'cb-access-sign': undefined,
                      'cb-access-timestamp': 1487076708000
                    },
                    body: '{"from":"BTC","to":"ETH","amount":"1"}'
                  }
                );
                expect(data.id).toEqual('c5aaf125-d99e-41fe-82ea-ad068038b278');
            });

        });
    });

    describe('get conversion', () => {
        test('get conversion with required path params', () => {
            request.mockReturnValue(Promise.resolve(getCryptoConversion));

            cryptoConversion
            .getAConversion('what')
            .then(data => {
                expect(request).toHaveBeenCalledWith('https://api.exchange.coinbase.com/conversions/what', {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'cb-access-key': 'what',
                      'cb-access-passphrase': 'yay',
                      'cb-access-sign': undefined,
                      'cb-access-timestamp': 1487076708000
                    }
                  }
                );
                expect(data.id).toEqual('c5aaf125-d99e-41fe-82ea-ad068038b278');
            });
        });
    });
});