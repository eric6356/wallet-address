const eth = require('eth-lib');

class Account {
    privateKey: string;
    address: string;
}

export function createAccount(): Account {
    return <Account>eth.account.create();
}
