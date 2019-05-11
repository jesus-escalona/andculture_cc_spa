import React, {Component} from 'react';

class BreweryDetails extends Component {
    render() {
        const { name, brewery_type, street, website_url, city, state, postal_code, longitude, latitude } = this.props.brewery;
        console.log(name, brewery_type, street, website_url, city, state, postal_code, longitude, latitude);
        return (
            <div className="details">

            </div>
        );
    }
}

export default BreweryDetails;
