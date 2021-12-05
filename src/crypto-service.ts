import { CoinbaseAccount } from './coinbase-account';
import { CryptoAccount } from './crypto-account';
import { CryptoConversion } from './crypto-conversion';
import { CryptoCurrency } from './crypto-currency';
import { CryptoOrder } from './crypto-order';
import { CryptoTransfer } from './crypto-transfer';
import { Base } from './base';

export class CryptoService {
    coinbaseAccount: CoinbaseAccount;
    cryptoAccount: CryptoAccount;
    cryptoConversion: CryptoConversion;
    cryptoCurrency: CryptoCurrency;
    cryptoOrder: CryptoOrder;
    cryptoTransfer: CryptoTransfer;

    constructor(apiKey?: string, passphrase?: string, env: Base.Environment = Base.Environment.Sandbox) {
        this.coinbaseAccount = new CoinbaseAccount(apiKey, passphrase, env);
        this.cryptoAccount = new CryptoAccount(apiKey, passphrase, env);
        this.cryptoConversion = new CryptoConversion(apiKey, passphrase, env);
        this.cryptoCurrency = new CryptoCurrency(null, null, env);
        this.cryptoOrder = new CryptoOrder(apiKey, passphrase, env);
        this.cryptoTransfer = new CryptoTransfer(apiKey, passphrase, env);
    }
}