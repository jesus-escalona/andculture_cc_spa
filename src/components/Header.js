import React, {Component} from 'react';
import logo from "../logo.svg";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <h2>
                    Search breweries near you!
                </h2>
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        );
    }
}

export default Header;
