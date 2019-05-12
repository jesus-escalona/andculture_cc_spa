import React, {Component, ReactNode} from 'react';
import { Route, Switch } from "react-router-dom";
import './App.sass';
import {BreweryDetails, Header, SearchBar} from "./components";
import { Breweries } from "./containers";
import axios from "axios";
import {BreweryProps} from "./containers/Breweries";

const api = process.env.REACT_APP_API_URL;

interface State {
    breweries: BreweryProps[],
    city: string,
    error: string,
}

type Props = {

}

class App extends Component<Props, State> {

    state = {
        breweries: [],
        city: "",
        error: ""
    };

    getBreweries = (): void => {
        const {city} = this.state;
        axios.get(`${api}/breweries?by_city=${city}`)
            .then(({data}) => {
                if(!data.length) {
                    this.setState({error: `Sorry, we could not find any breweries in ${city}`, breweries: []})
                } else {
                    this.setState({breweries: data, error: ""})
                }
            })
            .catch(error => {
                console.log(error)
            })
    };

    componentDidUpdate(prevProps: any, prevState: State): void {
        if(prevState.city !== this.state.city) {
            this.getBreweries()
        }
    }

    render(): ReactNode {
        const {breweries, error} = this.state;
        return (
            <div className="App">
                <Header text='Search breweries near you!'/>
                <Switch>
                    <Route exact path='/'  render={(routerProps) => (
                        <>
                            <SearchBar setCity={(city: string) => this.setState({city})}/>
                            {error.length !== 0 && <h3>{error}</h3>}
                            {breweries.length !== 0 && <Breweries { ...routerProps } {...this.state}/>}
                        </>
                    )
                    }/>
                    <Route path='/brewery/:id'  component={BreweryDetails} />
                    )
                    }/>
                </Switch>

            </div>
        );
    }
}

export default App;
