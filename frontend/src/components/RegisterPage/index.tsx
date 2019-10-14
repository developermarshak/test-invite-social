import React, {ChangeEvent, FormEvent} from 'react';
import {Link} from "react-router-dom";

import { FormCard, FormTextInput, Card} from "tabler-react";
import "tabler-react/dist/Tabler.css";

import {getConfig, tryLogin} from "../../services/Connect";

import types from './types';
import "./styles.css";
import Loader from "../Loader";


const REGISTRATION_PATH = "/api/registration";
let classNames = require('classnames');

class RegisterPage extends React.Component<types.Props, types.State>{

    constructor(props: types.Props) {
        super(props);
        this.state = {
            loading: false,
            email: "",
            password: "",
            invite_code: "",
            errors: []
        };
    }

    componentDidMount(): void {
        const match = this.props.match;

        const inviteCode = (match && match.params && match.params.invite_code) ? match.params.invite_code : null;

        if(inviteCode){
            this.setState({loading: true});
            this.getData(inviteCode).then((res) => {
                this.setState({
                    invite_code: inviteCode,
                    email: res.data.for_email,
                    loading: false
                });
            }, () => {
                this.setState({loading: false});
            });
        }
    }

    onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({loading: true});
        const loaded = () => {this.setState({loading: false});}
        this.tryRegistration().then(() => {
            tryLogin(this.state.email, this.state.password, this.props.axiosInstance).then(() => {
                this.props.customHistory.push("/user/me");
            }, loaded)
        }, loaded);

    }

    getData = async (inviteCode: string) => {
        return await this.props.axiosInstance.get("/api/registration_invite/"+inviteCode, getConfig());
    }

    tryRegistration = async () => {
        const {email, password, invite_code} = this.state;
        const data = {email, password, invite_code};
        return this.props.axiosInstance.post(REGISTRATION_PATH, data, getConfig(false));
    }

    setStateField = (field: 'email' | 'password' | 'invite_code') => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            if(e.target && e.target.value){
                let state = {...this.state};
                state[field] = e.target.value;
                this.setState(state);
            }

        }
    }

    render() {
        const {className = false, axiosInstance, customHistory, match, history, location,  ...rest} = this.props;

        const classes = classNames("wrapper", className);
        return (
            <>
                <div className={classes} {...rest}>
                    {this.state.loading ? <Loader/> : <FormCard onSubmit={ this.onSubmit } method={"POST"} buttonText={"Register"} title={"Registration page"}>
                            <FormTextInput label={"Email"} onChange={ this.setStateField('email') } type="text" value={this.state.email}/>
                            <FormTextInput label={"Password"} onChange={ this.setStateField('password') } type="password" />
                            <FormTextInput label={"Invite Code"} onChange={ this.setStateField('invite_code') } type="text" value={this.state.invite_code}/>
                    </FormCard>
                    }
                    <Card>
                        <Link className="btn btn-sm btn-success" to={"/auth/login"}>
                            Back to login
                        </Link>
                    </Card>
                </div>
            </>
        );
    }
}

export default RegisterPage;