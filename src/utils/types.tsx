export interface ToDoItemShape {
  name: string;
  importance: number;
  id: string;
}

export type items = ToDoItemShape[];


//0 is sort by time, 1 is sort by importance ascending and -1 is sort by importance descending
export type sortType = 0 | 1 | -1;

export interface myDbs {
  addRecord: (
    id: string,
    ToDoDescription: string,
    ToDoImportance: number
  ) => Promise<void>;
  readAllToDos: () => Promise<dbsToDos[]>;
  deleteRecord: (id: string) => Promise<void>;
  deleteAllRecords: () => Promise<void>;
}

export interface dbsToDos {
  id: string;
  ToDoDescription: any;
  ToDoImportance: any;
}
