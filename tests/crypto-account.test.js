import CryptoAccount from '../src/crypto-account';
import request from '../src/request';
import allCryptoAccount from './datas/all-crypto-account';
import singleCryptoAccount from './datas/single-crypto-account';
import singleCryptoAccountHolds from './datas/single-crypto-account-holds';
import crypto from 'crypto-js';

jest.mock('../src/request');
jest.mock('buffer', () => jest.fn());


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
            .then(data => expect(data[0].id).toEqual('7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da'));
        });
    });
    
    describe('single account', () => {
        test('fetch single crypto account', async () => {
            request.mockReturnValue(Promise.resolve(singleCryptoAccount));
    
            cryptoAccount
            .getSingleAccount(32)
            .then(data => expect(data.id).toEqual('7fd0abc0-e5ad-4cbb-8d54-f2b3f43364da'));
        });
    });

    describe('single account holds', () => {
        test('fetch single crypto account holds with only id', async () => {
            request.mockReturnValue(Promise.resolve(singleCryptoAccountHolds));

            cryptoAccount
            .getSingleAccountHolds(21)
            .then(data => expect(data[0].id).toEqual('c5cdd687-2d03-4a87-8dd7-c693a4bb766f'));
        });
    });
});
