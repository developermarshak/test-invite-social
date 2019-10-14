import {AxiosInstance} from "axios";

declare namespace Invite {
    type Props = {
        axiosInstance: AxiosInstance
    };
    type State = {
        loading: boolean,
        registered: number,
        wait: number,
    };
}

export default Invite;