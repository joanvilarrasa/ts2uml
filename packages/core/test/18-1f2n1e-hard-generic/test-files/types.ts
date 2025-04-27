export interface Address<T> {
  street: string;
  city: string;
  country: string;
  data: T;
}

export interface Person<T> {
  id: string;
  name: string;
  age: number;
  address: string | { [key: string]: Address<T> }[];
}
