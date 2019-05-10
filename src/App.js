import React, {Component} from 'react';
import './App.sass';
import { Header, SearchBar } from "./components";
import { Breweries } from "./containers";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

class App extends Component {

    state = {
        breweries: [],
        city: ""
    };

    getBreweries = () => {
        const {city} = this.state;
        axios.get(`${api}/breweries?by_city=${city}`)
            .then(({data}) => {
                this.setState({breweries: data})
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
        return (
            <div className="App">
                <Header/>
                <SearchBar setCity={(city) => this.setState({city})}/>
                <Breweries {...this.state}/>
            </div>
        );
    }
}

export default App;
