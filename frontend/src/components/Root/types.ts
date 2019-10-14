import {AxiosInstance, AxiosResponse} from "axios";

declare namespace Root {
    type Props = {
        className?: string
    };
    type State = {
        errors: string[]
    };

    type HandleRequest = (method: 'GET' | 'POST' | 'PUT' | 'FILE', url: string, data?: object | FormData) => Promise<AxiosResponse>
}

export default Root;