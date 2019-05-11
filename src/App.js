import React, {Component} from 'react';
import './App.sass';
import { Header, SearchBar } from "./components";
import { Breweries } from "./containers";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

class App extends Component {

    state = {
        breweries: [],
        city: "",
        error: ""
    };

    getBreweries = () => {
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

    componentDidUpdate(prevProps, prevState) {
        if(prevState.city !== this.state.city) {
            this.getBreweries()
        }
    }

    render() {
        const {breweries, error} = this.state;
        return (
            <div className="App">
                <Header/>
                <SearchBar setCity={(city) => this.setState({city})}/>
                {error.length !== 0 && <h3>{error}</h3>}
                {breweries.length !== 0 && <Breweries {...this.state}/>}
            </div>
        );
    }
}

export default App;
