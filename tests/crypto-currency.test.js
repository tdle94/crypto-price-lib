import { CryptoCurrency } from '../src/crypto-currency';
import request from '../src/request-service/request';
import allCryptoCurrency from './datas/crypto-currency';
import singleCryptoCurrency from './datas/gtc-currency';

jest.mock('../src/request-service/request');

describe('crypto currency', () => {
  const crypto = new CryptoCurrency();

  describe('all currencies', () => {  
    test('fetch all crypto currencies available', async () => {
      request.mockReturnValue(Promise.resolve(allCryptoCurrency));
  
      return crypto.getAll().then(data => {  
        expect(data[0].id).toEqual('DASH');
        expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/currencies', { method: 'GET', headers: { Accept: 'application/json' } });
      });
    });
  });
  
  describe('gtc currency', () => {
    test('fetch gtc currency', async () => {
      request.mockReturnValue(Promise.resolve(singleCryptoCurrency));
  
      return crypto.get('GTC').then(data => {  
        expect(data.id).toEqual('GTC');
        expect(request).toHaveBeenCalledWith('https://api-public.sandbox.exchange.coinbase.com/currencies/GTC', { method: 'GET', headers: { Accept: 'application/json' } });
      });
    });
  });
});