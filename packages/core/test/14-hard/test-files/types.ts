export interface Address<T> {
  street: string;
  city: string;
  country: string;
  data: T;
}

export interface Person {
  id: string;
  name: string;
  age: number;
  address: Address<string>[];
}
