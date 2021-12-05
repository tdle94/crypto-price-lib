import { CryptoTransfer } from '../src/crypto-transfer';
import request from '../src/request';
import depositFromCoinBaseAccount from './datas/deposit-from-coinbase-account';
import allPaymentMethods from './datas/all-payment-methods';
import allTransfers from './datas/all-transfers';
import singleTransfer from './datas/single-transfer';
import withdrawToCoinbaseAccount from './datas/withdraw-to-coinbase-account';
import withdrawToCryptoAddress from './datas/withdraw-to-crypto-address';
import feeEstimateForCryptoWithdrawal from './datas/fee-estimate-for-crypto-withdrawal';
import withdrawToPaymentMethod from './datas/withdraw-to-payment-method';
import crypto from 'crypto';

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
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/deposits/coinbase-account', {
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

    describe('all payment method', () => {
       test('get all payment method', () => {
            request.mockReturnValue(Promise.resolve(allPaymentMethods));
            cryptoTransfer
            .getAllPaymentMethod()
            .then(data => {
                expect(data[0].id).toEqual('cbdd9f28-34e7-5152-b1dc-d657bf8df858');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/payment-methods',{
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'cb-access-key': 'what',
                        'cb-access-passphrase': 'yay',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000
                    }
                });
            });
       });
    });

    describe('all transfers', () => {
        test('get all transfers', () => {
            request.mockReturnValue(Promise.resolve(allTransfers));
            cryptoTransfer
            .getAllTransfer()
            .then(data => {
                expect(data[0].id).toEqual('19ac524d-8827-4246-a1b2-18dc5ca9472c');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/transfers', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'cb-access-key': 'what',
                        'cb-access-passphrase': 'yay',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000
                    }
                });
            });
        });
    });

    describe('single transfer', () => {
        test('get single transfer', () => {
            request.mockReturnValue(Promise.resolve(singleTransfer));
            cryptoTransfer
            .getASingleTransfer('hello')
            .then(data => {
                expect(data.id).toEqual('19ac524d-8827-4246-a1b2-18dc5ca9472c');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/transfers/hello', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'cb-access-key': 'what',
                        'cb-access-passphrase': 'yay',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000
                    }
                });
            });
        });
    });

    describe('withdraw to coinbase account', () => {
        test('post withdraw to coinbase account without profile id', () => {
            request.mockReturnValue(Promise.resolve(withdrawToCoinbaseAccount));
            cryptoTransfer
            .withdrawToCoinbaseAccount('32', 'what', 'BTC')
            .then(data => {
                expect(data.id).toEqual('string');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/withdrawals/coinbase-account', {
                    method: 'POST',
                    body: '{"amount":"32","currency":"BTC","coinbase_account_id":"what"}',
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

    describe('withdraw to crypto address', () => {
        test('post withdraw to crypto address with all the require body params', () => {
            request.mockReturnValue(Promise.resolve(withdrawToCryptoAddress));
            cryptoTransfer
            .withdrawToCryptoAddress('32', 'BTC', 'Fdslkajflioi')
            .then(data => {
                expect(data.id).toEqual('string');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/withdrawals/crypto', {
                    method: 'POST',
                    body: '{"amount":"32","currency":"BTC","crypto_address":"Fdslkajflioi"}',
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

    describe('fee estimate for crypto withdrawal', () => {
        test('get fee estimate for crypto withdrawal', () => {
            request.mockReturnValue(Promise.resolve(feeEstimateForCryptoWithdrawal));
            cryptoTransfer
            .getFeeEstimateForCryptoWithdrawal()
            .then(data => {
                expect(data.fee).toEqual('string');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/withdrawals/fee-estimate', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'cb-access-key': 'what',
                        'cb-access-passphrase': 'yay',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000
                    }
                });
            });
        });
    });

    describe('withdraw to payment method', () => {
        test('post withdraw to payment method with all required body params', () => {
            request.mockReturnValue(Promise.resolve(withdrawToPaymentMethod));
            cryptoTransfer
            .withdrawToPaymentMethod('32', 'alsdfjad', 'ETH')
            .then(data => {
                expect(data.id).toEqual('string');
                expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/withdrawals/payment-method', {
                    method: 'POST',
                    body: '{"amount":"32","currency":"ETH","payment_method_id":"alsdfjad"}',
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