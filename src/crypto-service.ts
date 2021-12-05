import { CoinbaseAccount } from './coinbase-account';
import { CryptoAccount } from './crypto-account';
import { CryptoConversion } from './crypto-conversion';
import { CryptoCurrency } from './crypto-currency';
import { CryptoOrder } from './crypto-order';
import { CryptoTransfer } from './crypto-transfer';

export class CryptoService {
    coinbaseAccount: CoinbaseAccount;
    cryptoAccount: CryptoAccount;
    cryptoConversion: CryptoConversion;
    cryptoCurrency: CryptoCurrency;
    cryptoOrder: CryptoOrder;
    cryptoTransfer: CryptoTransfer;

    constructor(apiKey?: string, passphrase?: string) {
        this.coinbaseAccount = new CoinbaseAccount(apiKey, passphrase);
        this.cryptoAccount = new CryptoAccount(apiKey, passphrase);
        this.cryptoConversion = new CryptoConversion(apiKey, passphrase);
        this.cryptoCurrency = new CryptoCurrency();
        this.cryptoOrder = new CryptoOrder(apiKey, passphrase);
        this.cryptoTransfer = new CryptoTransfer(apiKey, passphrase);
    }
}