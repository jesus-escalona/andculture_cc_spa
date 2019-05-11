import React, {Component, ReactNode} from 'react';
import {BreweryProps} from "../containers/Breweries";
import { withRouter} from "react-router";
import {RouteComponentProps} from "react-router";

type PropsType = RouteComponentProps & {
    brewery: BreweryProps
}

class Brewery extends Component<PropsType> {

    goToBrewery = () => {
        this.props.history.push(`/brewery/${this.props.brewery.id}`)
    };

    render(): ReactNode {
        const { name, brewery_type, street, website_url } = this.props.brewery;
        return (
            <>
                <div className="brewery" onClick={this.goToBrewery}>
                    <p>{name}</p>
                    <p>{brewery_type}</p>
                    <p>{street || "No address for this brewery"}</p>
                    <a href={website_url} rel="noopener noreferrer" target="_blank">Site</a>
                </div>
            </>
        );
    }
}

export default withRouter(Brewery);
