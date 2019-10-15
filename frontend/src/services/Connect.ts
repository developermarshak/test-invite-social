import {getToken, setToken} from './TokenStorage';
import {AxiosInstance} from "axios";

const LOGIN_PATH = "/api/auth/login";

export function getUrl(path: string) {
    return `http://symfony.localhost${path}`
}

export function getInnerUrl(path: string) {
    return `http://localhost:4000${path}`
}

export async function tryLogin(email: string, password: string, axiosInstance: AxiosInstance) {
    const data = {email, password};
    let res = await axiosInstance.post(LOGIN_PATH, data, getConfig(false));
    const token = res.data.token;
    setToken(token);
}

export function getConfig(token: string | null | false = null) {
    let config = {
        headers: {
            'content-type': 'application/json',
        }
    };

    const tokenRes = (token === null) ? getToken() : token;

    if(tokenRes){
        config.headers = {...config.headers, ...{"authorization":`Bearer ${tokenRes}`}};
    }

    return config;
}