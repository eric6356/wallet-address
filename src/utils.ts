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

export function accountFromPhrase(coinName: string, phrase: string, repeat: number): Account {
    const privateKey = Array(repeat)
        .fill(0)
        .reduce(x => eth.hash.keccak256(x), phrase);
    return <Account>eth.account.fromPrivate(privateKey);
}
