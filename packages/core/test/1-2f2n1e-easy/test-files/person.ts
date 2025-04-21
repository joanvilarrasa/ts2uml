import type { Address } from './address';

export interface Person {
  id: string;
  name: string;
  age: number;
  address: Address;
}
