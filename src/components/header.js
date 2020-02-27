// libs needed
import React from 'react';
import logo from "../images/fantom_rocks_white.svg";

// prep the static header component
const Header = () => {
    return (
        <header className="fr-pane">
            <div className="fr-container fr-nav-bar">
                <img className="fr-logo" src={logo} alt="Fantom Rocks! Logo" aria-hidden="true"/>
                <div className="fr-title">
                    <h1>Fantom Rocks!</h1>
                    <h2>by Validator 17</h2>
                </div>
            </div>

            <div className="fr-container">
                <h2>Supercharge</h2>
                <h3>
                    Put Fantom's Opera Mainnet to the test! 20 transactions per click; still confirmed at lightning speed.
                </h3>
            </div>
        </header>
    );
};

export default Header;
