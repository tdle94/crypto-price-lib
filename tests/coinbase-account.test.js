import { Buffer } from 'buffer';
import CoinbaseAccount from '../src/coinbase-account';
import coinbaseWallet from './datas/coinbase-wallet';
import cryptoAddress from './datas/crypto-address';
import request from '../src/request';
import crypto from 'crypto-js';

jest.mock('../src/request');
jest.mock('Buffer', () => jest.fn());

Date.now = jest.fn(() => 1487076708000);

describe('coinbase account', () => {
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

    const coinbaseAccount = new CoinbaseAccount('what', 'yay');

    describe('coinbase wallets', () => {
        test('get all coinbase wallets', () => {
            request.mockReturnValue(Promise.resolve(coinbaseWallet));

            coinbaseAccount
            .getAllCoinbaseWallets()
            .then(data => {
                expect(data[0].id).toEqual('OXT');
            });
        });
    });

    describe('crypto address', () => {
        test('generate crypto address', () => {
            request.mockReturnValue(Promise.resolve(cryptoAddress));

            coinbaseAccount
            .generateCryptoAddress()
            .then(data => {
                expect(data.id).toEqual('fc9fed1e-d25b-54d8-b52b-7fa250c9ae2d');
            });
        });
    });
});