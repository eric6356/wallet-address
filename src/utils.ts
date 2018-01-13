const eth = require('eth-lib');

class Account {
    privateKey: string;
    address: string;
}

export function createAccount(coinName: string): Account {
    if (coinName === 'ETH') {
        return <Account>eth.account.create();
    } else {
        const account = new Account();
        account.privateKey = '';
        account.address = '';
        return account;
    }
}
