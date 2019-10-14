import React, {ChangeEvent, FormEvent} from 'react';
import {Link} from "react-router-dom";
import { FormCard, FormTextInput, Card} from "tabler-react";
import "tabler-react/dist/Tabler.css";

import {getConfig} from "../../services/Connect";
import Loader from '../Loader';

import types from './types';
import InviteCard from "../InvitePage/InviteCard";

const INVITE_PATH = "/api/invite";

class InvitePage extends React.Component<types.Props, types.State>{

    constructor(props: types.Props) {
        super(props);
        this.state = {
            loading: true,
            email: "",
            invites: [],
            errors: []
        };
        this.updateData();
    }

    onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {to: this.state.email};
        this.setState({loading: true});

        this.props.axiosInstance.post(INVITE_PATH, data, getConfig()).then(() => {
            this.updateData();
        }).catch(()=>{this.setState({loading: false});})

    }

    updateData = () => {
        this.props.axiosInstance.get(INVITE_PATH, getConfig()).then((data) => {
            if(data.data){
                this.setState({invites: data.data, loading: false});
            }
        }).catch(()=>{this.setState({loading: false});});
    }


    setEmail = (e: ChangeEvent<HTMLInputElement>) => {
        let email = "";
        if(e.target && e.target.value && e.target.value.length > 0){
            email = e.target.value;
        }

        this.setState({email});
    }

    render() {
        const {className = false, ...rest} = this.props;
        const classes = "wrapper "+className;

        return (
            <>
                <div className={classes} {...rest}>
                    <FormCard onSubmit={ this.onSubmit } method={"POST"} buttonText={"Generate"} title={"Generate invite"}>
                        <FormTextInput label={"Person Email"} onChange={ this.setEmail } type="email" />
                    </FormCard>
                    {
                        this.state.loading ? <Loader/> : this.state.invites.map((invite) => {
                          return <><InviteCard code={invite.code} for_email={invite.for_email}/></>
                        })
                    }
                    <Card>
                        <Link to={"/user/me"} className="btn btn-sm btn-success" >
                            Back to user page
                        </Link>
                    </Card>
                </div>


            </>
        );
    }
}

export default InvitePage;