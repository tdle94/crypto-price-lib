export default [
    {
      'id': 'DASH',
      'name': 'Dash',
      'min_size': '1',
      'status': 'online',
      'message': '',
      'max_precision': '0.00000001',
      'convertible_to': [],
      'details': {
        'type': 'crypto',
        'symbol': null,
        'network_confirmations': 2,
        'sort_order': 47,
        'crypto_address_link': 'https://chain.so/address/DASH/{{address}}',
        'crypto_transaction_link': 'https://chain.so/tx/DASH/{{address}}',
        'push_payment_methods': [
          'crypto'
        ],
        'group_types': [],
        'display_name': null,
        'processing_time_seconds': null,
        'min_withdrawal_amount': 0.0001,
        'max_withdrawal_amount': 5900
      }
    },
    {
      'id': 'YFI',
      'name': 'yearn.finance',
      'min_size': '0.00001',
      'status': 'online',
      'message': 'We\'ve started accepting yearn.finance deposits. Trading will begin shortly.',
      'max_precision': '0.000001',
      'convertible_to': [],
      'details': {
        'type': 'crypto',
        'symbol': null,
        'network_confirmations': 35,
        'sort_order': 215,
        'crypto_address_link': 'https://etherscan.io/token/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e?a={{address}}',
        'crypto_transaction_link': 'https://etherscan.io/tx/0x{{txId}}',
        'push_payment_methods': [
          'crypto'
        ],
        'group_types': [],
        'display_name': null,
        'processing_time_seconds': null,
        'min_withdrawal_amount': 0.0002,
        'max_withdrawal_amount': 20
      }
    }
  ];