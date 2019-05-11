import React, {Component, ReactNode} from 'react';
import {RouteComponentProps} from "react-router";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

type PathParamsType = {
    id: string,
}

type Props = RouteComponentProps<PathParamsType>

class BreweryDetails extends Component<Props> {

    state = {
        brewery: {},
        error: "",
    };

    getBrewery = (): void => {
        const { id } = this.props.match.params;
        axios.get(`${api}/breweries/${id}`)
            .then(({data}) => {
                this.setState({brewery: data, error: ""})
            })
            .catch(() => {
                this.setState({error: `Sorry, there's no brewery with this id`, brewery: {}})
            })
    };

    componentDidMount(): void {
        this.getBrewery();
    }

    render(): ReactNode {
        const { brewery, error } = this.state;
        console.log(brewery);
        return (
            <div className="details">
                {error.length !== 0 && <p>{error}</p>}
            </div>
        );
    }
}

export default BreweryDetails;
