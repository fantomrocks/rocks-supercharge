// libs needed
import React from 'react';
import {ftmToWei} from '../lib/units';
import {GQL_MUTATE_BURST} from "../schema/queries";

// static content
import spinner from '../images/cogs_spinner.svg';

// Constants used to calculate how many FTMs to send in a single transaction
const FTM_MIN_TO_SEND = 0.05;
const FTM_MAX_TO_SEND = 0.10;
const FTM_STEP_TO_SEND = 0.01;
const ACCOUNTS_TO_TARGET = 20;
const WAIT_FOR_TRANSFER = 1100;

const RESERVED_FEE_WEI = 1000000000000000; /* 0.001 FTM */

// prep the transaction sender component
class TxSender extends React.Component {
    // construct the component
    constructor(props) {
        // init parent
        super(props);

        // get the amount we want to use
        const amount = this.getRandomAmount();

        // set the state
        this.state = {
            isSending: false,
            isError: false,
            amount: amount,
            canSend: this.canSend(props.account, amount)
        };
    }

    // update source account's balance information
    updateBalance = (balance) => {
        // use the new balance
        this.props.account.balance = balance;

        // mark as send just started
        this.setState({
            canSend: this.canSend(this.props.account, this.state.amount)
        });
    };

    // finish the transaction loop
    doneSending = () => {
        // get the amount we want to use
        const amount = this.getRandomAmount();

        // mark as send just started
        this.setState({
            isSending: false,
            amount: amount,
            canSend: this.canSend(this.props.account, amount)
        });
    };

    // get random amount to be used for the next transfer
    getRandomAmount() {
        return FTM_MIN_TO_SEND + (Math.round(Math.random() * ((FTM_MAX_TO_SEND - FTM_MIN_TO_SEND) / FTM_STEP_TO_SEND)) * FTM_STEP_TO_SEND);
    }

    // verify if the transaction is possible
    canSend(account, amount) {
        return 0.0 < (account.balance - ((ftmToWei(amount) - RESERVED_FEE_WEI) * ACCOUNTS_TO_TARGET));
    }

    // send new transaction
    doSend = () => {
        if (!this.state.isSending) {
            // mark as send just started
            this.setState({isSending: true});

            // do the sending
            this.props.client.mutate({
                mutation: GQL_MUTATE_BURST,
                variables: {
                    from: this.props.account.id,
                    amount: ftmToWei(this.state.amount).toString(10),
                    count: ACCOUNTS_TO_TARGET
                },
                fetchPolicy: "no-cache"
            }).then(({data}) => {
                console.log(data.burst);

                // add transactions to the table
                this.props.onTransactions(data.burst);

                // process the transaction we just sent
                setTimeout(() => {
                    // mark the transaction as finished
                    this.doneSending();
                }, WAIT_FOR_TRANSFER);
            }).catch(() => {
                // set error state
                this.setState({isSending: false, isError: true});
            });
        }
    };

    // render the component
    render() {
        return (
            <div id="tr-actions" className={this.state.isSending ? 'fr-button-group fr-actions fr-is-sending' : 'fr-button-group fr-actions'}>
                <button className="fr-button" onClick={this.doSend} disabled={!this.state.canSend}>
                    Send {ACCOUNTS_TO_TARGET}&times; <span className="fr-amount">{this.state.amount.toFixed(2)} FTM</span>
                </button>
                <div className="fr-spinner-container">
                    <img className="fr-spinner" src={spinner} alt="The network is processing your transfer." aria-label="Processing"/>
                </div>
            </div>
        );
    }
}

export default TxSender;
