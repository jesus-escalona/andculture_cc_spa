import React, {Component, ReactNode} from 'react';
import { BreweryDetails } from "."
import {BreweryProps} from "../containers/Breweries";

interface State {
    details: boolean
}

interface Props {
    brewery: BreweryProps
}

class Brewery extends Component<Props, State> {
    state = {
        details: false
    };

    toggleDetails = (): void => {
        this.setState({details: !this.state.details})
    };

    render(): ReactNode {
        const { name, brewery_type, street, website_url } = this.props.brewery;
        return (
            <>
                <div className="brewery" onClick={this.toggleDetails}>
                    <p>{name}</p>
                    <p>{brewery_type}</p>
                    <p>{street || "No address for this brewery"}</p>
                    <a href={website_url} rel="noopener noreferrer" target="_blank">Site</a>
                </div>
                {this.state.details && <BreweryDetails {...this.props}/>}
            </>
        );
    }
}

export default Brewery;
