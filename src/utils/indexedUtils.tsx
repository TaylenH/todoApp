import { openDB, deleteDB } from "idb";
import {} from "idb/with-async-ittr";
import { dbsToDos } from "./types";

export const openConnection = async () => {
  if (window.indexedDB) {
    const db = await openDB("ToDoList", 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("ToDoList")) {
          let objectStore = db.createObjectStore("ToDoList", { keyPath: "id" });
          objectStore.createIndex("id", "id", { unique: true });
          objectStore.createIndex("ToDo", "ToDo", { unique: false });
          objectStore.createIndex("importance", "importance", {
            unique: false
          });
        }
      }
    }).catch(() => {
      throw new Error("failed to open");
    });

    db.onversionchange = async () => {
      let objectStore = db.transaction("ToDoList").objectStore("ToDoList");
      if (!objectStore.index("id")) {
        objectStore.createIndex("id", "id", { unique: true });
      }
    };

    const database = {
      addRecord: async (
        id: string,
        ToDoDescription: string,
        ToDoImportance: number
      ) => {
        await db.add("ToDoList", {
          id: id,
          ToDo: ToDoDescription,
          importance: ToDoImportance
        });
      },

      readAllToDos: async (): Promise<dbsToDos[]> => {
        let list = [];
        const transaction = db.transaction("ToDoList", "readwrite");
        const index = transaction.objectStore("ToDoList").index("id");

        for await (const cursor of index.iterate()) {
          list.push({
            id: cursor.key.toString(),
            ToDoDescription: cursor.value.ToDo,
            ToDoImportance: cursor.value.importance
          });
        }

        await transaction.done;
        return list;
      },

      deleteRecord: async (id: string) => {
        await db.delete("ToDoList", id);
      },

      deleteAllRecords: async () => {
        const transaction = db.transaction("ToDoList", "readwrite");
        const index = transaction.objectStore("ToDoList").index("id");

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
