export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
};

export function request(url: string, options: any) {
    return fetch(url, options).then(checkResponse)
};