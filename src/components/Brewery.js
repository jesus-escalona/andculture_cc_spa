import React, {Component} from 'react';

class Brewery extends Component {
    render() {
        const { name, brewery_type, street, website_url } = this.props.brewery;
        return (
            <div className="brewery">
                <p>{name}</p>
                <p>{brewery_type}</p>
                <p>{street}</p>
                <a href={website_url}>Site</a>
            </div>
        );
    }
}

export default Brewery;
