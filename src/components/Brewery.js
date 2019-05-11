import React, {Component} from 'react';
import { BreweryDetails } from "./index"

class Brewery extends Component {
    state = {
        details: false
    };

    toggleDetails = () => {
        this.setState({details: !this.state.details})
    };

    render() {
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
