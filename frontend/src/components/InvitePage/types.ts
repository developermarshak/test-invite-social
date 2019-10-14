import {HtmlHTMLAttributes} from "react";
import {AxiosInstance} from "axios";

declare namespace InvitePage {
    type Props = {
        axiosInstance: AxiosInstance
    } & HtmlHTMLAttributes<HTMLDivElement>;

    type State = {
        loading: boolean,
        email: string,
        invites: Invite[];
        errors: string[]
    };

    type Invite = {
        code: string,
        for_email: string
    };
}

export default InvitePage;