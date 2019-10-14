import {History} from "history";
import {AxiosInstance} from "axios";

declare namespace UserPage {
    type Props = {
        axiosInstance: AxiosInstance,
        customHistory: History
    };
    type State = {
        loading: boolean,
        loadingPassword: boolean,
        oldPassword: string | null
        newPassword: string | null
        user: User
    };

    type User = {
        id: number,
        email: string,
        description: string | null,
        photo: string | null
    };
}

export default UserPage;