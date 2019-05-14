import React, {Component, ReactNode} from 'react';
import {RouteComponentProps} from "react-router";
import axios from "axios";
import {Header, Map} from "."
import {BreweryProps} from "../containers/Breweries";
import GoBack from "./GoBack";

type PathParamsType = {
    id: string,
}

type Props = {
    ownApi: boolean,
}

interface State {
    brewery: BreweryProps,
    error: string,
    selectedBrewery: boolean,
}

class BreweryDetails extends Component<RouteComponentProps<PathParamsType> & Props, State> {

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
        const { ownApi } = this.props;
        axios.get(`${process.env[`${ownApi ? 'REACT_APP_RAILS_API_URL' : 'REACT_APP_API_URL'}`]}/breweries/${id}`)
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
