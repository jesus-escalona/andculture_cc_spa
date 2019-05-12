import React, {Component, ReactNode} from 'react';
import Autosuggest from 'react-autosuggest';
import {cities} from "../cities";

interface Props {
    setCity: Function;
}

interface State {
    value: string,
    suggestions: string[],
}

const getSuggestions = (value: string): string[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : cities.filter(city => city.toLowerCase().slice(0, inputLength) === inputValue);
};

const renderSuggestion = (suggestion: string): ReactNode => {
    return <p className="suggestion">{suggestion}</p>
};

class SearchBar extends Component<Props, State> {

    state = {
        value: "",
        suggestions: []
    };

    onSuggestionsFetchRequested = ({ value }: {value: string}): void => {
        this.setState({
            suggestions: getSuggestions(value).slice(0,3)
        });
    };

    onSuggestionSelected = (event: object , {suggestion} : {suggestion: string}): void => {
        this.props.setCity(suggestion);
        this.onSuggestionsClearRequested()
    };

    onSuggestionsClearRequested = (): void => {
        this.setState({
            suggestions: []
        });
    };

    onChange = (event: React.KeyboardEvent<any> , { newValue } : { newValue: string}): void => {
        this.setState({
            value: newValue
        });
    };

    onKeyDown = (e: React.KeyboardEvent<any>) => {
        if(e.key === 'Enter') {
            this.props.setCity(this.state.value);
        }
    };



    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            className: "search",
            placeholder: "Write the name of a city. Ex: New York",
            value,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown
        };

        return (
            <div className="searchContainer">
                {value && <p>Press <strong>Enter</strong> to search</p>}
                <Autosuggest
                    suggestions={suggestions}
                    getSuggestionValue={(s:string):string => s}
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
