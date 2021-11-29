import RequestOptions from './url-request-option';

export default async (url: string, options: RequestOptions) => {
    try {
        return await fetch(url, options)
        .then(response => response.json());
    } catch (error) {
        return Promise.reject(error);
    }
};