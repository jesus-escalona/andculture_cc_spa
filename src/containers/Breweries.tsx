import React, {Component, ReactElement, ReactNode} from 'react';
import { Brewery } from "../components";

export type BreweryProps = {
    id: number,
    name: string,
    brewery_type: string,
    street: string,
    website_url: string,
}

interface Props {
    breweries: BreweryProps[],
    city: string,
}

class Breweries extends Component<Props> {
    render(): ReactNode {
        const { breweries, city } = this.props;
        let breweriesList = breweries.map((brewery: BreweryProps, i: number): ReactElement => <Brewery key={i} brewery={brewery}/>);
        return city &&
            <>
                <h2>Found {breweries.length} breweries in {city}</h2>
                <h3>Click on one for more details</h3>
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
