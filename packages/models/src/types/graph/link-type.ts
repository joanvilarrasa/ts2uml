import { z } from 'zod';

export const ZLinkType = z.enum(['association', 'inheritance']);

/**
 * Represents the different types of relationships between nodes in the diagram.
 * - "association": Indicates a basic association between nodes
 * - "inheritance": Indicates an inheritance/extends relationship
 */
export type LinkType = z.infer<typeof ZLinkType>;

export type SomeTestType = {
  testAttribute: string;
  somethingElse: number;
};

export type SomeTestType2 = {
  name: SomeTestType;
  age: number;
};

export type SomeTestType3 = SomeTestType & SomeTestType2;

export type SomeTestType4 = 'hello' | SomeTestType2;
