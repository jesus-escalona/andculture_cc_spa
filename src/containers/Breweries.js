import React, {Component} from 'react';
import Brewery from "../components/Brewery";

class Breweries extends Component {
    render() {
        const { breweries, city } = this.props;
        let breweriesList = breweries.map((brewery,i) => <Brewery key={i} brewery={brewery}/>);
        return city &&
            <>
                <h2>Found {breweries.length} breweries in {city}</h2>
                <div className="breweriesList">
                    <div className="head">
                        <h3>Brewery Name</h3>
                        <h3>Brewery Type</h3>
                        <h3>Address</h3>
                        <h3>Link to website</h3>
                    </div>
                    {breweriesList}
                </div>
            </>
    }
}

export default Breweries;
