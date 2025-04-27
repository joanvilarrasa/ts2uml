export interface Person {
  id: string;
  name: string;
  age: number;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  country: string;
}
