import {HtmlHTMLAttributes} from "react";
import {AxiosInstance} from "axios";
import {History} from "history";

declare namespace RegisterPage {
    type Props = {
        customHistory: History
        axiosInstance: AxiosInstance
        match?: any
        location?: any
        history?: any
    } & HtmlHTMLAttributes<HTMLDivElement>;
    type State = {
        loading: boolean,
        email: string,
        password: string,
        invite_code: string,
        errors: string[]
    };
}

export default RegisterPage;