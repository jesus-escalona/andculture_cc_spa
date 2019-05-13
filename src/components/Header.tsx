import React, {Component, ReactNode} from 'react';
import logo from "../logo.svg";

type Props = {
    text: string,
}

class Header extends Component<Props> {
    render(): ReactNode {
        const { text } = this.props;
        return (
            <header className="App-header">
                <h2>
                    {text}
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
