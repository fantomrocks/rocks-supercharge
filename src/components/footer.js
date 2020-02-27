// libs needed
import React from 'react';

// prep the static header component
const Footer = () => {
    return (
        <footer className="fr-pane">
            <div className="fr-footer">
                <div className="fr-nav-bar fr-nav fr-made-by">
                    <a href="https://gofantom.net" target="_blank" rel="noreferrer noopener">Made with <span className="fr-in-love"><i className="fas fa-heart" /></span> by GoFantom (validator #17)</a>
                </div>
                <div className="fr-nav-bar fr-nav">
                    <a href="https://t.me/FantomRocksChat" target="_blank" rel="noreferrer noopener">FantomRocks Telegram</a>
                    <a href="https://explorer.fantom.network/" target="_blank" rel="noreferrer noopener">Fantom Explorer</a>
                    <a href="https://wallet.fantom.network/" target="_blank" rel="noreferrer noopener">Fantom Wallet</a>
                    <a href="https://fantom.foundation" target="_blank" rel="noreferrer noopener">Fantom Website</a>
                    <a href="https://github.com/Fantom-foundation" target="_blank" rel="noreferrer noopener">Fantom on GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
