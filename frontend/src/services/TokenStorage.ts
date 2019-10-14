import Cookies from 'universal-cookie';
const cookies = new Cookies();
export function setToken(token: string | null) {
    cookies.set('token', token, { path: '/' });
}

export function getToken(): string | null {
    return cookies.get('token');
}

export function removeToken() {
    cookies.set('token', "", { path: '/' });
}