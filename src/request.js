export const request = async (url, options) => {
    try {
        return await fetch(url, options)
        .then(response => response.json());
    } catch (error) {
        return Promise.reject(error);
    }
};