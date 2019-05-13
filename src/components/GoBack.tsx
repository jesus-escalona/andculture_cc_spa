import React, {Component, ReactNode} from 'react';
import {RouteComponentProps, withRouter} from "react-router";


type Props = {
    text: string
}

class GoBack extends Component<RouteComponentProps & Props> {

    goBack = () => {
        this.props.history.goBack()
    };

    render(): ReactNode {
        return (
            <button className="go-back" onClick={this.goBack}>
                <div>❮</div>
                <div>{this.props.text}</div>
            </button>
        )
    }
}

export default withRouter(GoBack);
