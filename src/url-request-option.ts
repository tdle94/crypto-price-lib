export default interface RequestOptions {
    method: string;
    headers: {
        Accept: 'application/json',
        'Content-Type'?: string
    },
    body?: string
}