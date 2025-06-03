namespace Test {
  export interface Foo {
    a: boolean;
    b: boolean;
  }

  export class Bar {
    c: string;
    d: number;
  }

  export enum Baz {
    A = 'A',
    B = 'B',
  }

  export type Qux = string | number;
}
