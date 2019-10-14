import React, {ChangeEvent, FormEvent} from 'react';
import { Card, FormTextInput, Page, Grid, Button} from "tabler-react";
import "tabler-react/dist/Tabler.css";

import PhotoUpload from "../PhotoUpload";
import Invite from "../Invite";
import Loader from '../Loader';

import {removeToken} from "../../services/TokenStorage";

import types from './types';
import "./styles.css";
import {getConfig} from "../../services/Connect";

const UPDATE_PATH = "/api/user/me";

class UserPage extends React.Component<types.Props, types.State>{
        constructor(props: types.Props){
            super(props);
            this.state = {
                loading: true,
                loadingPassword: false,
                oldPassword: null,
                newPassword: null,
                user: {
                    id: 0,
                    email: "loading...",
                    description: null,
                    photo: null
                }
            }
        }

    onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        this.put({"description": this.state.user.description}).then(() => {
            this.setState({loading: false});
        }, () => {
            this.setState({loading: false});
        })
    }

    onSubmitPassword = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({
            loadingPassword: true
        });
        this.put({"old_password": this.state.oldPassword, "password": this.state.newPassword}, "/password").then(() => {
            this.setState({loadingPassword: false});
        }, () => {
            this.setState({loadingPassword: false});
        })
    }

    componentDidMount = async () => {
        const data = await this.props.axiosInstance.get(UPDATE_PATH, getConfig());
        const user: types.User = data.data;
        this.setState({user, loading: false});
    }

    put = async (data: object, path: string = "") => {
            return this.props.axiosInstance.put(UPDATE_PATH+path, data, getConfig());
    }

    setOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
        let oldPassword = null;
        if(e.target && e.target.value && e.target.value.length > 0){
            oldPassword = e.target.value;
        }

        this.setState({oldPassword});
    }

    setNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        let newPassword = null;
        if(e.target && e.target.value && e.target.value.length > 0){
            newPassword = e.target.value;
        }

        this.setState({newPassword});
    }

    setDescription = (e: ChangeEvent<HTMLInputElement>) => {
        let description = null;
        if(e.target && e.target.value && e.target.value.length > 0){
            description = e.target.value;
        }

        const user = this.state.user;
        user.description = description;

        this.setState({user});
    }

    render() {
        const user = this.state.user;

        const description = user.description || "";
        return (
                    <Page.Content title="Home User Page">
                        <Grid.Row cards={true}>
                            <Grid.Col width={12} sm={8} lg={4}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Your Profile</Card.Title>
                                    </Card.Header>

                                    {this.state.loading ? <Loader/> : <>
                                            <Card.Body className={"p-6"}>
                                                <FormTextInput label={"Id"} type="text"
                                                               readOnly={true} value={user.id}/>
                                                <FormTextInput label={"Email"} type="text"
                                                               readOnly={true} value={user.email}/>
                                                <FormTextInput label={"Description"} type="textarea"
                                                               onChange={this.setDescription} value={description}/>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button onClick={this.onSubmit} className={"btn-block btn-primary"}>Save Profile</Button>
                                            </Card.Footer>
                                        </>
                                    }
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Change Password</Card.Title>
                                    </Card.Header>
                                        {this.state.loadingPassword ? <Loader/> : <>
                                            <Card.Body className={"p-6"}>
                                                <FormTextInput label={"Old Password"} type="password"
                                                               onChange={this.setOldPassword}/>
                                                <FormTextInput label={"New Password"} type="password"
                                                               onChange={this.setNewPassword}/>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button onClick={this.onSubmitPassword} className={"btn-block btn-primary"}>Change</Button>
                                            </Card.Footer>
                                        </>
                                }
                                </Card>
                            </Grid.Col>
                            <Grid.Col width={12} sm={8} lg={4}>
                                <PhotoUpload axiosInstance={this.props.axiosInstance} photoSrc={user.photo}/>
                            </Grid.Col>
                            <Grid.Col width={12} sm={8} lg={4}>
                                <Invite axiosInstance={this.props.axiosInstance} />
                                <Card>
                                    <Button className="btn btn-block btn-dark" onClick={() => {
                                        removeToken();
                                        this.props.customHistory.push("/auth/login");
                                    }}>Logout</Button>
                                </Card>

                                <Card>
                                    <Button className="btn btn-block btn-white" onClick={() => {
                                        this.props.customHistory.push("/user");
                                    }}>Users</Button>
                                </Card>
                            </Grid.Col>
                        </Grid.Row>
                    </Page.Content>
        );
    }
}

export default UserPage;