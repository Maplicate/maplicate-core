import { MaplicateNode } from "./MaplicateNode";

export function create(ipfs, name) {
  return new MaplicateNode(ipfs, name);
}

export function join(ipfs, address) {
  return new MaplicateNode(ipfs, address);
}
