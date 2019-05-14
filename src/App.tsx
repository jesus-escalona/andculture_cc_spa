import React, {Component, ReactNode} from 'react';
import { Route, Switch as Switcher } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";


import './App.sass';
import {BreweryDetails, Header, SearchBar} from "./components";
import { Breweries } from "./containers";
import {BreweryProps} from "./containers/Breweries";

interface State {
    breweries: BreweryProps[],
    city: string,
    error: string,
    ownApi: boolean,
}

type Props = {

}

class App extends Component<Props, State> {

    state = {
        breweries: [],
        city: "",
        error: "",
        ownApi: false
    };

    getBreweries = (): void => {
        const {city, ownApi} = this.state;
        axios.get(`${process.env[`${ownApi ? 'REACT_APP_RAILS_API_URL' : 'REACT_APP_API_URL'}`]}/breweries?by_city=${city}`)
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
        const { breweries, error, ownApi } = this.state;
        // @ts-ignore
        return (
            <div className="App">
                <Switcher>
                    <Route exact path='/'  render={(routerProps) => (
                        <>
                            <div className='toggle'>
                                <Switch checkedIcon={false} uncheckedIcon={false} offColor='#2F4858' onColor='#00C6AF' onChange={() => this.setState({ownApi: !ownApi})} checked={ownApi} />
                                <h3 className='desc'>{ownApi ? 'Rails API' : 'OpenBreweryDB'}</h3>
                            </div>
                            <Header text='Search breweries near you!'/>
                            <SearchBar setCity={(city: string) => this.setState({city})}/>
                            {error.length !== 0 && <h3>{error}</h3>}
                            {breweries.length !== 0 && <Breweries { ...routerProps } {...this.state}/>}
                        </>
                    )}
                    />
                    <Route path='/brewery/:id'  render={(routerProps) => <BreweryDetails { ...routerProps } ownApi={ownApi}/>} />
                    <Route render={() => <Header text='404: This is not the page you are looking for' />} />
                </Switcher>
            </div>
        );
    }
}

export default App;
