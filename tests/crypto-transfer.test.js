import { CryptoTransfer } from '../src/crypto-transfer';
import request from '../src/request';
import depositFromCoinBaseAccount from './datas/deposit-from-coinbase-account';
import crypto from 'crypto-js';

jest.mock('../src/request');
jest.mock('Buffer', () => ({
    from: jest.fn()
}));


Date.now = jest.fn(() => 1487076708000);

describe('crypto currency', () => {
    crypto.createHmac = () => {
        return {
            update: () => {
                return {
                    digest: jest.fn()
                };
            }
        };
    };

    const cryptoTransfer = new CryptoTransfer('what', 'yay');

    describe('deposit from coinbase account', () => {
        test('deposit without profile id', () => {
            request.mockReturnValue(Promise.resolve(depositFromCoinBaseAccount));
            cryptoTransfer
            .depositFromCoinbaseAccount(32, 'welkr', 'BTC')
            .then(data => {
                expect(data.id).toEqual('string');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/deposits/coinbase-account',{
                    method: 'POST',
                    body: '{"amount":32,"currency":"BTC","coinbase_account_id":"welkr"}',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'cb-access-key': 'what',
                        'cb-access-passphrase': 'yay',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000
                    }
                });
            });
        });
    });
});