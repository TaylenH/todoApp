import { openDB, deleteDB } from "idb";
import {} from "idb/with-async-ittr";
import { dbsTodos } from "./types";

export const openConnection = async () => {
  if (window.indexedDB) {
    const db = await openDB("todoList", 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("todoList")) {
          let objectStore = db.createObjectStore("todoList", { keyPath: "id" });
          objectStore.createIndex("id", "id", { unique: true });
          objectStore.createIndex("todo", "todo", { unique: false });
          objectStore.createIndex("importance", "importance", {
            unique: false
          });
        }
      }
    }).catch(() => {
      throw new Error("failed to open");
    });

    db.onversionchange = async () => {
      let objectStore = db.transaction("todoList").objectStore("todoList");
      if (!objectStore.index("id")) {
        objectStore.createIndex("id", "id", { unique: true });
      }
    };

    const database = {
      addRecord: async (
        id: string,
        todoDescription: string,
        todoImportance: number
      ) => {
        await db.add("todoList", {
          id: id,
          todo: todoDescription,
          importance: todoImportance
        });
      },

      readAllTodos: async (): Promise<dbsTodos[]> => {
        let list = [];
        const transaction = db.transaction("todoList", "readwrite");
        const index = transaction.objectStore("todoList").index("id");

        for await (const cursor of index.iterate()) {
          list.push({
            id: cursor.key.toString(),
            todoDescription: cursor.value.todo,
            todoImportance: cursor.value.importance
          });
        }

        await transaction.done;
        return list;
      },

      deleteRecord: async (id: string) => {
        await db.delete("todoList", id);
      },

      deleteAllRecords: async () => {
        const transaction = db.transaction("todoList", "readwrite");
        const index = transaction.objectStore("todoList").index("id");

        for await (const cursor of index.iterate()) {
          database.deleteRecord(cursor.key.toString());
        }

        await transaction.done;
      }
    };

    return database;
  } else {
    throw new Error("indexedDB not supported");
  }
};
