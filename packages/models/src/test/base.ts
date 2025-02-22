import type { ColDef } from 'ag-grid-community';
import type { Graph } from '../types/graph/graph.ts';

export interface User {
  id: string;
  name: Graph;
  email: string;
  password: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Child extends Omit<User, 'password' | 'name'> {
  name: number;
  role: 'child';
}

export interface Child2 extends ColDef {
  name: number;
  role: 'child';
}
