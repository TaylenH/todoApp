export interface todoItem {
    name: string;
    importance: number;
    id: string;
};

export type items = todoItem[];

export type sortType = 0 | 1 | -1;

export interface myDbs {
    addRecord: (id: string, todoDescription: string, todoImportance: number) => Promise<void>;
    readAllTodos: () => Promise<dbsTodos[]>;
    deleteRecord: (id: string) => Promise<void>;
    deleteAllRecords: () => Promise<void>;
}

export interface dbsTodos {
    id: string;
    todoDescription: any;
    todoImportance: any;
}