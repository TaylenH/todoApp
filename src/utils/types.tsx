export interface ToDoItem {
  name: string;
  importance: number;
  id: string;
}

export type items = ToDoItem[];

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
