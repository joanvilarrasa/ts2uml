// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/style/noNamespace: <explanation>
namespace Test {
  export interface Foo {
    a: boolean;
    b: boolean;
  }

  export class Bar {
    c: string;
    d: number;
  }

  // biome-ignore lint/nursery/noEnum: <explanation>
  export enum Baz {
    A = 'A',
    B = 'B',
  }

  export type Qux = string | number;
}
