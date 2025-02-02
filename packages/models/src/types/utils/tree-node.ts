import type { CheckboxPartialCheckedStatus } from './checkbox-partial-checked-status.ts';

export interface TreeNode {
  id: string;
  isFolder: boolean;
  isFile: boolean;
  isElement: boolean;
  checked: CheckboxPartialCheckedStatus;
  children?: { [key: string]: TreeNode };
  name: string;
}
