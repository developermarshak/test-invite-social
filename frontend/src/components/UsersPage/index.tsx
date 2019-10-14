import React from 'react';
import {Link} from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import {Page, Tag, Table, Button} from "tabler-react";

import Loader from "../Loader";
import {getConfig, getUrl} from "../../services/Connect";
import UserPageTypes from "../UserPage/types";

import "./styles.css";
import types from './types';

const UPDATE_PATH = "/api/user";

class UsersPage extends React.Component<types.Props, types.State>{
    constructor(props: types.Props){
        super(props);
        this.state = {
            loading: true,
            pages: 1,
            page: 1,
            users: []
        }
    }

    componentDidMount = async () => {
        await this.updateUsers(1);
    }

    setPage = (page: number) => {
        this.setState({
            page,
            loading: true
        });
        this.updateUsers(page).then(() => {
            this.setState({loading: false});
        });
    }

    updateUsers = async (page: number) => {
        const data = await this.props.axiosInstance.get(UPDATE_PATH+"?page="+page, getConfig());
        const users: UserPageTypes.User[] = data.data.users;
        const pages = data.data.pages;
        console.log(data.data);
        this.setState({users, pages, loading: false});
    }

    render() {
        const users = this.state.users;

        const BackToProfile = <>
            <div>
                <Link className={"btn btn-success"} to={'/user/me'}>Back To Profile</Link>
                <br/>
            </div>
        </>

        if(this.state.loading){
            return <Page.Content title="Users">
                <Loader/>
                {BackToProfile}
            </Page.Content>
        }

        if(users.length === 0){
            return <Page.Content title="Users">
                Cannot find some user, please try again later
                {BackToProfile}
            </Page.Content>
        }
        const pages = [];
        for(let i = this.state.page - 5; i <= this.state.pages; i++){
            if(i < 1){
                continue;
            }
            if(pages.length >= 7){
                break;
            }
            pages.push(<Button onClick={ () => {
                this.setPage(i);
            }}>{i}</Button>);
        }
        return (
                    <Page.Content title="Users">
                        <Table>
                            <Table.Header>
                                <Table.ColHeader>Username</Table.ColHeader>
                                <Table.ColHeader>Description</Table.ColHeader>
                                <Table.ColHeader>Photo</Table.ColHeader>
                            </Table.Header>
                            <Table.Body>

                                {users.map((user: UserPageTypes.User) => <Table.Row>
                                    <Table.Col>
                                        <Tag.List>
                                              <Tag color="blue">{user.email}</Tag>
                                         </Tag.List>
                                    </Table.Col>
                                    <Table.Col>{user.description}</Table.Col>
                                    <Table.Col>
                                        {
                                            user.photo && <img className={"big-img"} alt="Profile" src={getUrl("/img/"+user.photo)}/>
                                        }
                                    </Table.Col>
                                </Table.Row>)}

                            </Table.Body>
                        </Table>
                        <div>
                            {pages}
                        </div>
                        {BackToProfile}
                    </Page.Content>
        );
    }
}

export default UsersPage;