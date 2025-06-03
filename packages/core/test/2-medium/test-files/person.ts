import type { Address } from './address';

export interface Person<T> {
  id: string;
  name: string;
  age: number;
  address: Address;
  data: T;
}
