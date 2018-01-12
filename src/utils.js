import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');
window.ec = ec;


export const randAddress = () => {
    const key = ec.genKeyPair();
    return {
        pr: '0x' + key.priv.toString(16),
        address: '', // TODO
    }
}
