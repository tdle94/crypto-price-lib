export default interface RequestOptions {
    method: string;
    headers: {
        Accept: 'application/json'
    },
    body?: string
}