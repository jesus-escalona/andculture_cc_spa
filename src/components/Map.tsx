import React, { Component } from 'react';
import ReactMapGL, {Marker, ViewState} from 'react-map-gl';
import {BreweryProps} from "../containers/Breweries";
import CityPin from "./Pin";

type State = {
    viewport: ViewState,
    error: string,
}

type Props = {
    brewery: BreweryProps
}

class Map extends Component<Props, State> {

    state = {
        viewport: {
            width: '10vmax',
            height: '40vh',
            latitude: 0,
            longitude: 0,
            zoom: 15
        },
        error: ""
    };

    componentDidMount(): void {
        const { viewport } = this.state;
        const { brewery: { latitude, longitude} } = this.props;
        if (!latitude || !longitude) this.setState({error: "Sorry we can't find the brewery on the map"});
        this.setState({viewport: {...viewport, latitude: parseFloat(latitude), longitude: parseFloat(longitude)}})
    }

    render() {
        const { error, viewport: { latitude, longitude } } = this.state;
        if (error) return <p>{error}</p>;

        return (
            <ReactMapGL
                style={{border: '2px solid #2F4858', borderRadius: '5px', textAlign: 'justify', overflow: 'hidden', margin: '2vmin', minWidth: '100%'}}
                {...this.state.viewport}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                onViewportChange={(viewport) => this.setState({viewport})}
            >
                <Marker key={1} latitude={latitude} longitude={longitude}>
                    <CityPin/>
                </Marker>
            </ReactMapGL>
        );
    }

}

export default Map;
