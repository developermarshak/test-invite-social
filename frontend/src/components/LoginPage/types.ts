import {HtmlHTMLAttributes} from "react";
import {History} from "history";
import {AxiosInstance} from "axios";

declare namespace LoginPage {
    type Props = {
        email?: string,
        password?: string,
        customHistory: History;
        axiosInstance: AxiosInstance
    } & HtmlHTMLAttributes<HTMLDivElement>;
    type State = {
        email: string,
        password: string,
        errors: string[],
        loading: boolean
    };
}

export default LoginPage;