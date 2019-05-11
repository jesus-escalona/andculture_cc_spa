import React, {Component, ReactNode} from 'react';
import logo from "../logo.svg";

class Header extends Component {
    render(): ReactNode {
        return (
            <header className="App-header">
                <h2>
                    Search breweries near you!
                </h2>
                <div>
                    <img src={logo} className="App-logo right" alt="logo" />
                    <img src={logo} className="App-logo left" alt="logo" />
                </div>
            </header>
        );
    }
}

export default Header;
