import * as elliptic from 'elliptic';

const ec = new elliptic.ec('secp256k1');

class Key {
    privateKey: string;
    publicKey: string;
    address: string;
}

export function randKey(): Key {
    // const privateKey = ''.join(
    //     Array.from(crypto.getRandomValues(new Uint8Array(32))).map(one =>
    //         one.toString(16)
    //     )
    // );
    const ecKey = ec.genKeyPair();
    const key = new Key();
    key.privateKey = ecKey.priv.toString(16);
    key.publicKey = ecKey.getPublic().toString(16); // .encode('hex'); // TODO
    return key;
}
