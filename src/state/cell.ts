export type CellTypes = 'code' | 'text';
// this comment will be remove;
export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}