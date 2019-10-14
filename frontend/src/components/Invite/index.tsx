import React from 'react';
import {Card, StampCard} from "tabler-react";
import {Link} from "react-router-dom";

import Loader from "../Loader";
import {getConfig} from "../../services/Connect";

import types from "./types";

const STAT_PATH = "/api/stat/";
export default class Invite extends React.Component<types.Props, types.State>{
    constructor(props: types.Props){
        super(props);
        this.state = {
            loading: true,
            registered: 0,
            wait: 0
        };
    }

    componentDidMount = async () => {
        const data = await this.props.axiosInstance.get(STAT_PATH, getConfig());

        this.setState({
            loading: false,
            registered: data.data.registered,
            wait: data.data.wait
        });
    }

    render = () => {
        return <Card>
            <Card.Header>
                <Card.Title>Statistics invites</Card.Title>
            </Card.Header>
            <Card.Body>
                {
                    this.state.loading ? <Loader/> : <>
                        <StampCard
                            color="red"
                            icon="users"
                            header={<>{this.state.registered.toString()} <small>Registered users</small></>}
                            footer={`${this.state.wait.toString()} waited users`}
                        />
                        <Link className="btn btn-sm btn-success" to={"/invite"}>
                            Invite User
                        </Link>
                    </>
                }

            </Card.Body>
        </Card>;
    }
}