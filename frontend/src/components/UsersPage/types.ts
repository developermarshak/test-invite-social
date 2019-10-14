import {History} from "history";
import UserPageTypes from '../UserPage/types'
import {AxiosInstance} from "axios";

declare namespace UserPage {
    type Props = {
        axiosInstance: AxiosInstance,
        customHistory: History
    };
    type State = {
        loading: boolean
        pages: number
        page: number
        users: UserPageTypes.User[]
    };
}

export default UserPage;