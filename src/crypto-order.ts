import { URLQueryItem } from './request-service/url-request';
import { Base } from './base';
import request from './request-service/request';

export class CryptoOrder extends Base {
    async getAllFills(orderId?: string, productId?: string, profileId?: string, limit?: number, before?: number, after?: number) {
        const method = 'POST';
        const requestPath = '/fills';

        const queryItems = [
            new URLQueryItem('order_id', orderId),
            new URLQueryItem('product_id', productId),
            new URLQueryItem('profile_id', profileId),
            new URLQueryItem('limit', limit),
            new URLQueryItem('before', before),
            new URLQueryItem('after', after)
        ];

        this.configureHeaderWithRequestBodyAndQueryParams(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async getAllOrders(limit: number, status: [string], profileId?: string, productId?: string, startDate?: Date, endDate?: Date, before?: string, after?: string, sortedBy: string = 'created_at', sorting: string = 'desc',) {
        const method = 'POST';
        const requestPath = '/orders';

        const queryItems = [
            new URLQueryItem('limit', limit),
            new URLQueryItem('status', status),
            new URLQueryItem('profileId', profileId),
            new URLQueryItem('productId', productId),
            new URLQueryItem('startDate', startDate.toISOString()),
            new URLQueryItem('endDate', endDate.toISOString()),
            new URLQueryItem('before', before),
            new URLQueryItem('after', after),
            new URLQueryItem('sortedBy', sortedBy),
            new URLQueryItem('sorting', sorting)
        ];
        
        this.configureHeaderWithRequestBodyAndQueryParams(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }

    async cancelAllOrders(profileId?: string, productId?: string) {
        const method = 'DELETE';
        const requestPath = '/orders';

        const queryItems = [
            new URLQueryItem('product_id', productId),
            new URLQueryItem('profile_id', profileId)
        ]

        this.configureHeaderWithRequestBodyAndQueryParams(method, requestPath, {}, queryItems);

        return request(this.urlRequest.getURLString(), this.options);
    }
}