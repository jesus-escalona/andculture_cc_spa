import React, {Component, ReactNode} from 'react';
import {RouteComponentProps} from "react-router";
import axios from "axios";
import {Header, Map} from "."
import {BreweryProps} from "../containers/Breweries";
import GoBack from "./GoBack";
const api = process.env.REACT_APP_API_URL;

type PathParamsType = {
    id: string,
}

interface State {
    brewery: BreweryProps,
    error: string,
    selectedBrewery: boolean,
}

class BreweryDetails extends Component<RouteComponentProps<PathParamsType>, State> {

    state = {
        brewery: {
            id: 0,
            name: "",
            street: "",
            brewery_type: "",
            city: "",
            state: "",
            postal_code: "",
            longitude: "",
            latitude: "",
            website_url: ""
        },
        error: "",
        selectedBrewery: false
    };

    getBrewery = (): void => {
        const { id } = this.props.match.params;
        axios.get(`${api}/breweries/${id}`)
            .then(({data}) => {
                this.setState({brewery: data, error: "", selectedBrewery: true})
            })
            .catch(() => {
                this.setState({error: "Sorry, there's no brewery with this id", selectedBrewery: false})
            })
    };

    componentDidMount(): void {
        this.getBrewery();
    }

    render(): ReactNode {
        const { selectedBrewery, brewery: {name, street, city, state, postal_code}, error } = this.state;
        return (
            <>
                {error.length !== 0 && <p>{error}</p>}
                {selectedBrewery &&
                <>
                    <Header text={`Showing details for ${name}`}/>
                    <div className="detailsContainer">
                        <p>{`${street}, ${city}, ${state}, ${postal_code}`}</p>
                        <Map brewery={this.state.brewery}/>
                        <GoBack text="Back to listings" />
                    </div>
                </>
                }
            </>
        );
    }
}

export default BreweryDetails;
