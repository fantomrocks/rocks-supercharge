// libs needed
import React from 'react';
import {GQL_QUERY_ACCOUNTS_BALANCE} from '../schema/queries';
import {formatWeiToFtm} from '../lib/units';

// some control constants
const BALANCE_POLL_INTERVAL = 200;

// prep the accounts pair component
class Account extends React.Component {
    // construct the component
    constructor(props) {
        // init parent
        super(props);

        // set the state
        this.state = {
            account: props.account
        };
    }

    // start the component internals
    componentDidMount() {
        this.startBalancePoll();
    }

    // cleanup the component internals before removing
    componentWillUnmount() {
        this.stopBalancePoll();
    }

    // start poll for the account balance
    startBalancePoll() {
        // do not start the timer again if already running; may not be needed
        if (!this.pollTimer) {
            // poll every N milliseconds from remote server
            this.pollTimer = setInterval(() => {
                this.props.client.query({
                    query: GQL_QUERY_ACCOUNTS_BALANCE,
                    variables: {
                        list: [this.state.account.id]
                    },
                    fetchPolicy: "no-cache"
                }).then(({data}) => {
                    // update balances as polled
                    this.updateBalance(data.accounts);
                });
            }, BALANCE_POLL_INTERVAL);
        }
    }

    // stop poll for account balance
    stopBalancePoll() {
        if (this.pollTimer) {
            clearInterval(this.pollTimer);
            this.pollTimer = null;
        }
    }

    // update balance on accounts and set the new state
    updateBalance(accounts) {
        // make a new pair instead of mutating the existing one
        const newState = {
            account: {...this.state.account}
        };

        // propagate new balances to the new pair
        accounts.forEach(acc => {
            if (acc.id === newState.account.id) {
                newState.account.balance = acc.balance;
            }
        });

        // do we need to change the state?
        if (newState.account.balance !== this.state.account.balance) {
            // update the state
            this.setState(newState);

            // propagate the change up
            this.props.onBalanceChanged(newState.account.balance);
        }
    }

    // render the component
    render() {
        return (
            <div className="fr-accounts">
                <div className="fr-account">
                    <div className="fr-account-name">
                        <h4>{this.state.account.name}</h4>
                        <div className="fr-address">{this.state.account.address}</div>
                    </div>
                    <div className="fr-amount">
                        <span className="fr-val">{formatWeiToFtm(this.state.account.balance)}</span><span className="fr-unit">FTM</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
