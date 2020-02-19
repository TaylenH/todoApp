export interface todoItem {
    name: string;
    description?: string;
    importance: number;
    id: string;
};

export type items = todoItem[];

export type sortType = 0 | 1 | -1;
