import CryptoAccount from '../src/crypto-account';
import request from '../src/request';
import allCryptoAccount from './datas/all-crypto-account';
import singleCryptoAccount from './datas/single-crypto-account';
import singleCryptoAccountHolds from './datas/single-crypto-account-holds';
import singleCryptoAccountLedger from './datas/single-crypto-account-ledger';
import singleCryptoAccountTransfer from './datas/single-crypto-account-transfer';
import crypto from 'crypto-js';

jest.mock('../src/request');
jest.mock('buffer', () => jest.fn());

Date.now = jest.fn(() => 1487076708000);

describe('crypto Account', () => {
    crypto.createHmac = () => {
        return {
            update: () => {
                return {
                    digest: jest.fn()
                };
            }
        };
    };

    const cryptoAccount = new CryptoAccount('anykey', 'hello');

    describe('all accounts', () => {
        test('fetch all crypto accounts', async () => {
            request.mockReturnValue(Promise.resolve(allCryptoAccount));

            cryptoAccount
            .getAllAccountsForAProfile()
            .then(data => {
                expect(data[0].id).toEqual('7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da');
                expect(request).toHaveBeenCalledWith('https://api.exchange.coinbase.com/accounts', { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'cb-access-key': 'anykey',
                        'cb-access-passphrase': 'hello',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000,
                    }
                });
            });
        });
    });
    
    describe('single account', () => {
        test('fetch single crypto account', async () => {
            request.mockReturnValue(Promise.resolve(singleCryptoAccount));

            cryptoAccount
            .getSingleAccount(32)
            .then(data => {
                expect(data.id).toEqual('7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da');
                expect(request).toHaveBeenCalledWith('https://api.exchange.coinbase.com/accounts/account_id/32', { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'cb-access-key': 'anykey',
                        'cb-access-passphrase': 'hello',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000,
                    }
                });
            });
        });
    });

    describe('single account holds', () => {
        test('fetch single crypto account holds with only id', async () => {
            request.mockReturnValue(Promise.resolve(singleCryptoAccountHolds));

            cryptoAccount
            .getSingleAccountHolds(21)
            .then(data => {
                expect(data[0].id).toEqual('c5cdd687-2d03-4a87-8dd7-c693a4bb766f');
                expect(request).toHaveBeenCalledWith('https://api.exchange.coinbase.com/accounts/21/holds', { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'cb-access-key': 'anykey',
                        'cb-access-passphrase': 'hello',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000,
                    }
                });
            });
        });
    });

    describe('single account ledger', () => {
        test('fetch single account ledger with only id', async () => {
            request.mockReturnValue(Promise.resolve(singleCryptoAccountLedger));

            cryptoAccount
            .getSingleAccountLedger(21)
            .then(data => {
                expect(data[0].id).toEqual('1444415179');
                expect(request).toHaveBeenCalledWith('https://api.exchange.coinbase.com/accounts/21/ledger', { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'cb-access-key': 'anykey',
                        'cb-access-passphrase': 'hello',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000,
                    }
                });
            });
        });
    });

    describe('single account transfer', () => {
        test('fetch single account trasnfer with only id', async () => {
            request.mockReturnValue(Promise.resolve(singleCryptoAccountTransfer));

            cryptoAccount
            .getSingleAccountTransfer(23)
            .then(data => {
                expect(data[0].id).toEqual('19ac524d-8827-4246-a1b2-18dc5ca9472c');
                expect(request).toHaveBeenCalledWith('https://api.exchange.coinbase.com/accounts/23/transfers', { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'cb-access-key': 'anykey',
                        'cb-access-passphrase': 'hello',
                        'cb-access-sign': undefined,
                        'cb-access-timestamp': 1487076708000,
                    }
                });
            });
        });
    });
});
