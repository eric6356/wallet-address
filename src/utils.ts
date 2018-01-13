const eth = require('eth-lib');

class Account {
    privateKey: string;
    address: string;
}

function emptyAccount(): Account {
    const account = new Account();
    account.privateKey = '';
    account.address = '';
    return account;
}

export function createAccount(coinName: string): Account {
    if (coinName === 'ETH') {
        return <Account>eth.account.create();
    } else {
        return emptyAccount();
    }
}

export function accountFromPrivate(coinName: string, pr: string): Account {
    if (coinName === 'ETH') {
        return <Account>eth.account.fromPrivate(pr);
    } else {
        return emptyAccount();
    }
}
