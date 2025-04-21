export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Person<T> {
  id: string;
  name: string;
  age: number;
  address: Address;
  data: T;
}
