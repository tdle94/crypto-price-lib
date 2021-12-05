import { URLQueryItem } from './url-request';
import { Base } from './base';
import request from './request';

export class CryptoTransfer extends Base {
    async depositFromCoinbaseAccount(amount: string, coinbaseAccountId: string, currency: string, profileId?: string) {
        const method = 'POST';
        const requestPath = '/deposits/coinbase-account';
        const requestBody: CryptoTransfer.CoinbaseAccountBody =  {
            amount,
            currency,
            profile_id: profileId,
            coinbase_account_id: coinbaseAccountId
        };

        this.configureHeaderOptions(method, requestPath, requestBody);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async depositFromPaymentMethod(amount: string, paymentMethodId: string, currency: string, profileId?: string) {
        const method = 'POST';
        const requestPath = '/deposits/payment-method';
        const requestBody: CryptoTransfer.PaymentMethodBody = {
            amount,
            currency,
            profile_id: profileId,
            payment_method_id: paymentMethodId,
        };

        this.configureHeaderOptions(method, requestPath, requestBody);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getAllPaymentMethod() {
        const method = 'GET';
        const requestPath = '/payment-methods';
        
        this.configureHeaderOptions(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getAllTransfer() {
        const method = 'GET';
        const requestPath = '/transfers';
        
        this.configureHeaderOptions(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getASingleTransfer(transferId: string) {
        const method = 'GET';
        const requestPath = `/transfers/${transferId}`;

        this.configureHeaderOptions(method, requestPath);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async withdrawToCoinbaseAccount(amount: string, coinbaseAccountId: string, currency: string, profileId?: string) {
        const method = 'POST';
        const requestPath = '/withdrawals/coinbase-account';
        const requestBody: CryptoTransfer.CoinbaseAccountBody = {
            amount,
            currency,
            profile_id: profileId,
            coinbase_account_id: coinbaseAccountId
        };

        this.configureHeaderOptions(method, requestPath, requestBody);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async withdrawToCryptoAddress(amount: string, currency: string, cryptoAddress: string, profileId?: string, destinationTag?: string, noDestinationTag?: boolean, towFactorCode?: string, nonce?: number, fee?: string) {
        const method = 'POST';
        const requestPath = '/withdrawals/crypto';
        const requestBody: CryptoTransfer.CryptoAddressBody = {
            amount,
            currency,
            nonce,
            fee,
            profile_id: profileId,
            crypto_address: cryptoAddress,
            destination_tag: destinationTag,
            no_destination_tag: noDestinationTag,
            two_factor_code: towFactorCode,
        };

        this.configureHeaderOptions(method, requestPath, requestBody);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getFeeEstimateForCryptoWithdrawal(currency?: string, cryptoAddress?: string) {
        const method = 'GET';
        const requestPath = '/withdrawals/fee-estimate';
        const queryItems = [
            new URLQueryItem('currency', currency),
            new URLQueryItem('crypto_address', cryptoAddress)
        ];

        this.configureHeaderOptions(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async withdrawToPaymentMethod(amount: string, paymentMethodId: string, currency: string, profileId?: string) {
        const method = 'POST';
        const requestPath = '/withdrawals/payment-method';
        const requestBody: CryptoTransfer.PaymentMethodBody = {
            amount,
            currency,
            profile_id: profileId,
            payment_method_id: paymentMethodId,
        };

        this.configureHeaderOptions(method, requestPath, requestBody);

        return request(this.urlRequest.getURLString(), this.options);
    }
}

namespace CryptoTransfer {
    interface CommonBody {
        amount: string,
        currency: string,
        profile_id?: string,
    }

    export interface CoinbaseAccountBody extends CommonBody {
        coinbase_account_id: string
    }

    export interface PaymentMethodBody extends CommonBody {
        payment_method_id?: string
    }

    export interface CryptoAddressBody extends CommonBody {
        fee?: string,
        nonce?: number,
        two_factor_code?: string,
        no_destination_tag?: boolean,
        destination_tag?: string
        crypto_address: string
    }
}