import React, {Component} from 'react';
import axios from "axios";
import Autosuggest from 'react-autosuggest';
import {cities} from "../cities";

const api = process.env.REACT_APP_API_URL;

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : cities.filter(city => city.toLowerCase().slice(0, inputLength) === inputValue);
};

const renderSuggestion = suggestion => {
    return <p className="suggestion">{suggestion}</p>
};

class SearchBar extends Component {

    state = {
        value: "",
        brewery: {},
        suggestions: []
    };

    getBreweries = () => {
        axios.get(`${api}/breweries/autocomplete`)
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value).slice(0,3)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    render() {
        const { value, suggestions } = this.state;

        const suggestionProps = {
            className: "search",
            placeholder: "Type your city",
            value,
            onChange: this.onChange
        };

        const inputProps = {
            className: "search",
            placeholder: "Type your city",
            value,
            onChange: this.onChange
        };

        return (
            <div className="searchContainer">
                <Autosuggest
                    suggestions={suggestions}
                    getSuggestionValue={(s) => s}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default SearchBar;
