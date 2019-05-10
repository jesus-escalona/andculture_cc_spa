import React, {Component} from 'react';

class SearchBar extends Component {
    render() {
        return (
            <div className="searchContainer">
                <input className="search" placeholder="Type your city"/>
            </div>
        );
    }
}

export default SearchBar;
