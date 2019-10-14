import React from 'react';
import {FormTextInput, Grid, Button} from "tabler-react";
import "tabler-react/dist/Tabler.css";
import CopyToClipboard from 'react-copy-to-clipboard';

import {getInnerUrl} from "../../../services/Connect";

import types from './types';

class InviteCard extends React.Component<types.Props, types.State>{

    constructor(props: types.Props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    render() {
        const {...invite} = this.props;

        return <>
            <Grid.Row cards={true}>
                <Grid.Col width={12} sm={12} lg={6}>
                    <FormTextInput label={"Invite Code"} readOnly={true} type="text" value={invite.code} />
                </Grid.Col>
                <Grid.Col width={12} sm={12} lg={6}>
                    <FormTextInput label={"To"} readOnly={true} type="text" value={invite.for_email} />
                </Grid.Col>
            </Grid.Row>
            <Grid.Row cards={true}>
                <Grid.Col width={12} sm={12} lg={12}>
                    <CopyToClipboard text={getInnerUrl("/registration/"+invite.code)}
                                     onCopy={ () => this.setState({copied: true}) }>
                        <Button className={"btn-primary"}>
                            {this.state.copied ? <>Copied</> : <>Copy registration link</>}
                        </Button>
                    </CopyToClipboard>
                </Grid.Col>
            </Grid.Row>
            <br/>
        </>
    }
}

export default InviteCard;