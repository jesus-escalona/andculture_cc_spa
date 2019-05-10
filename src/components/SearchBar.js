import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {cities} from "../cities";

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

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value).slice(0,3)
        });
    };

    onSuggestionSelected = (event, {suggestion}) => {
        this.props.setCity(suggestion);
        this.onSuggestionsClearRequested()
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

        const inputProps = {
            className: "search",
            placeholder: "Enter a city. Ex: New York",
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
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default SearchBar;
