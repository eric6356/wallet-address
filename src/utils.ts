// import { ec as EC } from 'elliptic';

// const ec = new EC('secp256k1');

// TODO
class Key {
  privateKey: string;
  publicKey: string;
  address: string;
}

export function randKey(): Key {
  return new Key();
}
