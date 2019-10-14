import React, {ChangeEvent, FormEvent} from 'react';

import { FormCard, FormTextInput, Card} from "tabler-react";
import {Link} from "react-router-dom";
import "tabler-react/dist/Tabler.css";

import {setToken} from "../../services/TokenStorage"
import Loader from "../Loader";

import types from './types';
import "./styles.css";
import {tryLogin} from "../../services/Connect";

let classNames = require('classnames');

class LoginPage extends React.Component<types.Props, types.State>{

    constructor(props: types.Props) {
        super(props);
        this.state = {
            email: this.props.email || "",
            password: this.props.password || "",
            errors: [],
            loading: false
        };
    }

    onSubmit = async (e: FormEvent) => {
        this.setState({loading: true})
        e.preventDefault();
        try{
            const {email, password} = this.state;
            let res = await tryLogin(email, password, this.props.axiosInstance);
            if(!res.data.token){
                let errors = [];
                errors.push("Invalid login or password.");
                this.setState({errors});
            }
            else{
                console.log(res);
                console.log(res.data);
                const token = res.data.token;
                setToken(token);

                const history = this.props.customHistory;
                history.push("/user/me");
            }
        }
        catch (e) {
            if(e.response && e.response.statusText){
                console.log(e);
            }

        }
        this.setState({loading:false})

    }

    setEmail = (e: ChangeEvent<HTMLInputElement>) => {
        let email = "";
        if(e.target && e.target.value && e.target.value.length > 0){
            email = e.target.value;
        }

        this.setState({email});
    }

    setPassword = (e: ChangeEvent<HTMLInputElement>) => {
        let password = "";
        if(e.target && e.target.value && e.target.value.length > 0){
            password = e.target.value;
        }

        this.setState({password});
    }

    render() {
        const {className = false, customHistory, ...rest} = this.props;
        const classes = classNames("wrapper", className);

        if(this.state.loading){
            return <Loader/>;
        }
        return (
            <>
                <div className={classes} {...rest}>
                    <FormCard onSubmit={ this.onSubmit } method={"POST"} buttonText={"Login"}  title={"Login page"}>
                            <FormTextInput label={"Email"} onChange={ this.setEmail } type="email" />
                            <FormTextInput label={"Password"} onChange={ this.setPassword } type="password" />
                    </FormCard>
                    <Card>
                        <Link className="btn btn-sm btn-success" to={"/registration"}>
                            Registration
                        </Link>
                    </Card>
                </div>
            </>
        );
    }
}

export default LoginPage;