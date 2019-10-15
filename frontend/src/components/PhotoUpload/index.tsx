import React, {ChangeEvent, FormEvent} from 'react';

import { Form, Button, Card} from "tabler-react";
import "tabler-react/dist/Tabler.css";

import {getConfig} from "../../services/Connect";

import types from './types';
import "./styles.css";

const UPLOAD_PATH = "/api/photo";
let classNames = require('classnames');

class PhotoUpload extends React.Component<types.Props, types.State>{

    constructor(props: types.Props) {
        super(props);
        this.state = {
            photoSrc: this.props.photoSrc,
            file: null,
            token: null
        };
    }

    onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const {file} = this.state;

        if(!file){
            return;
        }

        const formData = new FormData();

        formData.append('photo',file);

        let config = getConfig();
        config.headers["content-type"] = 'multipart/form-data';

        let res = await this.props.axiosInstance.post(UPLOAD_PATH, formData, config);

        this.setState({
            photoSrc: res.headers["x-location"]
            });

    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let file: File | null = null;
        if(e.target && e.target.files && e.target.files.length > 0){
            file = e.target.files[0];
        }

        this.setState({file});
    }

    render() {
        const {className = false, photoSrc, ...rest} = this.props;
        const photoSrcRes = this.state.photoSrc || photoSrc;

        const classes = classNames("wrapper", className);

        return (
                <Card className={classes} {...rest}>
                    <Card.Header>
                        <Card.Title>Your Photo</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <>
                        {photoSrcRes && <img className={"PhotoUpload-photo"}
                                             src={`http://symfony.localhost/img/${photoSrcRes}`} alt={"Profile"}/>}

                        <Form.FileInput  onChange={this.onChange}/>
                        </>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={this.onSubmit} className={"btn-block btn-primary"}>Upload Photo</Button>
                    </Card.Footer>
                </Card>
        );
    }
}

export default PhotoUpload;