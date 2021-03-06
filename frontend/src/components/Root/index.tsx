import React from 'react';
import {Router, Switch} from "react-router";
import {Link, Route} from "react-router-dom";
import { Page, Alert } from "tabler-react";
import "tabler-react/dist/Tabler.css";
import axios, {AxiosInstance} from "axios";
import { createBrowserHistory, History } from 'history';


import LoginPage from "../LoginPage"
import UserPage from "../UserPage"
import RegisterPage from "../RegisterPage"
import UsersPage from "../UsersPage";
import InvitePage from "../InvitePage";

import {removeToken} from "../../services/TokenStorage";
import PrivateRoute from "../PrivateRoute";

import "./styles.css";
import types from "./types";

export default class Root extends React.Component<types.Props, types.State>{
    protected customHistory: History;

    protected axiosInstance: AxiosInstance;

    constructor(props: types.Props){
        super(props);

        const axiosInstance = axios.create({
            baseURL: 'http://symfony.localhost'
        })

        axiosInstance.interceptors.response.use((config) => config, error => this.errorHandler(error));

        this.axiosInstance = axiosInstance;
        this.customHistory = createBrowserHistory();
        this.state = {
            errors: []
        };
    }

    errorHandler = (error: any) => {
        let errorMessage = "Cannot do request, please try again.";
        let errors = [];
        if(error.response && error.request && error.response.status) {
            const {status, data} = error.response;
            const url = error.request.responseURL;

            if (status === 401 && url.indexOf("/api/auth/login") === -1) {
                errorMessage = "Please login =)";
                removeToken();
                this.customHistory.push('/auth/login');
            }

            else if (data.error_description && data.error_description.errors) {
                errors = data.error_description.errors.map((errorItem: any) => {
                    const field = errorItem.property_path.replace("[", "").replace("]", "");
                    return field+": "+errorItem.message
                });
            }
            else if(data.error_message){
                errorMessage = data.error_message;
            }
            else if (status === 400) {
                errorMessage = "Validation error";

            }
            else if (status === 401) {
                errorMessage = "Invalid credentials";
            }
            else if (status === 413){
                errorMessage = "Too big request"
            }
            else if (status >= 500){
                errorMessage = "Internal error please try again"
            }
        }

        if(errors.length === 0){
            errors.push(errorMessage);
        }

        this.setErrors(errors);

        return Promise.reject({ ...error })
    }

    setErrors = (errors: any) => {
        this.setState({errors});
        setTimeout(() => {
            this.setState({errors: []});
        }, 5000);
    }

    render = () => {
        const errors = [...this.state.errors];

        const {customHistory, axiosInstance} = this;
        const defaultProps = {customHistory, axiosInstance};

        return <Router history={this.customHistory}>
        <Page>
            <Page.Main>
                {
                    errors.length > 0 && <div className={"errorsContainer"}>
                        {
                            errors.map((error: string) => {
                                return <Alert type="danger" icon="alert-triangle">
                                    {error}
                                </Alert>
                            })
                        }
                    </div>
                }
                <Switch>
                    <PrivateRoute path={"/"} exact={true}>
                        <UserPage {...defaultProps}/>
                    </PrivateRoute>
                    <Route path={"/auth/login"}>
                        <LoginPage {...defaultProps}/>
                    </Route>
                    <Route path={"/registration/:invite_code"} render={(props) => {
                        return <RegisterPage {...defaultProps} {...props}/>

                    }}/>
                    <Route path={"/registration"}>
                        <RegisterPage {...defaultProps}/>
                    </Route>
                    <PrivateRoute path={"/user/me"}>
                        <UserPage {...defaultProps}/>
                    </PrivateRoute>
                    <PrivateRoute path={"/user"}>
                        <UsersPage {...defaultProps}/>
                    </PrivateRoute>
                    <PrivateRoute path={"/invite"}>
                        <InvitePage axiosInstance={axiosInstance}/>
                    </PrivateRoute>
                    <Route path="*">
                        <div>This page not exist :( <Link to={"/"}>Go Home!</Link></div>
                    </Route>
                </Switch>
            </Page.Main>
        </Page></Router>;
    }
}