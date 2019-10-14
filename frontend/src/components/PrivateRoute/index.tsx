import React from 'react';
import {Route, Redirect} from "react-router";

import {getToken} from "../../services/TokenStorage";

import types from "./types";

export default class PrivateRoute extends React.Component<types.Props>{

    render = () => {

        return (
            <Route {...this.props} render={({ location }) =>
                    getToken() ? (
                        this.props.children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/auth/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        );
    }
}