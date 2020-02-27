// libs needed
import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {GQL_QUERY_ACCOUNT_PAIR} from './schema/queries';
import {weiToFtm} from "./lib/units";

// components used
import Header from './components/header';
import Footer from './components/footer';
import Account from './components/account';
import TxSender from './components/sender';
import TxTable from './components/tx_table';

// static content to be used
import './style/App.css';

// define the application itself
const App = (props) => {
    // get an account pair data from remote server
    const {loading, error, data} = useQuery(GQL_QUERY_ACCOUNT_PAIR);

    // show loading memo
    if (loading) return (<h1>Loading the application ...</h1>);

    // show error message
    if (error) return (<h1>Loading failed, application API not available! :(</h1>);

    // choose one of the pair with more tokens
    const account = (weiToFtm(data.pair.one.balance) < weiToFtm(data.pair.two.balance) ? data.pair.two : data.pair.one);

    // we will need a reference to the TxTable so we can push new transactions to it
    const txTableRef = React.createRef();
    const onTransactions = (tx) => {
        txTableRef.current.addTransactions(tx);
    };

    // we will need a reference to the Accounts so we can inform sender about changed balance
    const senderRef = React.createRef();
    const onBalanceChanged = (balance) => {
        senderRef.current.updateBalance(balance);
    };

    // return the full app render
    return (
        <div className="fr-app">
            <Header/>

            <main className="fr-content">
                <div className="fr-content-pane">
                    {/* Render the loaded pair of accounts */}
                    <Account account={account} client={props.client} onBalanceChanged={onBalanceChanged}/>

                    {/* Now render the Tx Sender */}
                    <TxSender ref={senderRef} account={account} client={props.client} onTransactions={onTransactions}/>

                    {/* Now render the list of transactions already sent */}
                    <TxTable ref={txTableRef}/>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default App;
