export interface Foo {
  a: boolean;
  b: boolean;
}

export class Bar implements Foo {
  a: boolean;
  b: boolean;

  constructor() {
    this.a = true;
    this.b = true;
  }

  foo(): Foo {
    return { a: true, b: true };
  }
}
