import {HtmlHTMLAttributes} from "react";
import {AxiosInstance} from "axios";

declare namespace PhotoUpload {
    type Props = {
        photoSrc: string | null,
        axiosInstance: AxiosInstance
    } & HtmlHTMLAttributes<HTMLDivElement>;
    type State = {
        photoSrc: string | null
        file: File | null,
        token: string | null
    };
}

export default PhotoUpload;