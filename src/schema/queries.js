/**
 * Specifies queries used by the application
 */
import {gql} from 'apollo-boost';

// query base account pair
export const GQL_QUERY_ACCOUNT_PAIR = gql`
    {
        pair {
            one {
                id,
                name,
                address,
                balance
            }
            two {
                id,
                name,
                address,
                balance
            }
        }
    }
`;

// query balance of a given accounts pair
export const GQL_QUERY_ACCOUNTS_BALANCE = gql`
    query Accounts ($list: [ID!]) {
        accounts (list: $list) {
            id,
            balance
        }
    }
`;

// use mutate to transfer between pair of accounts
export const GQL_MUTATE_BURST = gql`
    mutation Burst ($from: ID!, $amount: Amount!, $count: Int!) {
        burst(fromAccountId: $from, amount: $amount, targetsCount: $count) {
            id
            from {
                id
                name
            }
            to {
                id
                name
            }
            amount
            timeStamp
        }        
    }
`;
