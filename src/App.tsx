import React from "react";
import { items, sortType, myDbs, dbsTodos } from "./utils/types";
import { Fab, Container, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import EventListener from "react-event-listener";
import TodoDialog from "./components/TodoDialog";
import TopBar from "./components/TopBar";
import SmallDrawer from "./components/SmallDrawer";
import AddIcon from "@material-ui/icons/Add";

import TodoListSurface from "./components/TodoListSurface";
import { openConnection } from './utils/indexedUtils';

//Mock Data
const Mock: items = [
  {
    name: "item 1",
    importance: 1,
    id: "1"
  },
  {
    name: "item 2",
    importance: 2,
    id: "2"
  },
  {
    name: "item 3",
    importance: 3,
    id: "3"
  },
  {
    name: "item 4",
    importance: 4,
    id: "4"
  },
  {
    name: "item 5",
    importance: 5,
    id: "5"
  },
  {
    name: "item 6",
    importance: 6,
    id: "6"
  },
  {
    name: "item 7",
    importance: 7,
    id: "7"
  },
  {
    name: "item 8",
    importance: 8,
    id: "8"
  },
  {
    name: "item 9",
    importance: 9,
    id: "9"
  }
];

const useStyles = makeStyles({
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  }
});

const App: React.FC = () => {
  const styles = useStyles();

  const [items, updateItems] = React.useState<items>([]);
  const [sortOption, setSortOption] = React.useState<sortType>(0);
  const [isTodoOpen, setTodoOpen] = React.useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [isPomodoReady, setPomodoReady] = React.useState<boolean>(false);
  const [pomodoInterval, setPomodoInterval] = React.useState<number>(0);
  const [db, setDb] = React.useState<myDbs | null>(null);

  let sortedItems = [...items];

  React.useEffect(() => {
    const establishConnection = async () => {
      console.log("establish connection");
      let request = await openConnection().then(db => db);
      setDb(request);
      return request;
    }
    const getTodos = async (database: myDbs) => {
      console.log(database)
      if(database){
        let list = await (database as myDbs).readAllTodos().then((list) => list);
        let todoList: items = (list as dbsTodos[]).map(item => {
          return {
            id: item.id,
            name: item.todoDescription,
            importance: item.todoImportance
          } 
        });
        updateItems(todoList);
      }
    }

    try{
      establishConnection().then((database) => getTodos(database));
    }catch(e){
      console.log(e.message);
    }

  }, []);


  //Sorts the list accordingly based on the sort option selected
  sortOption === 0 ||
    sortedItems.sort((item1, item2) => {
      if (item1.importance > item2.importance) {
        return sortOption === 1 ? 1 : -1;
      } else if (item1.importance < item2.importance) {
        return sortOption === 1 ? -1 : 1;
      }
      return 0;
    });

  const handleDelete = (id: string): void => {
    const deleteFromDatabase = async () => {
      if(db){
        try{
          await (db as myDbs).deleteRecord(id);
        }catch(e){
          console.log(e.message);
        }
      }
    }
    updateItems(items.filter(item => item.id !== id));
    deleteFromDatabase();
  };

  const handleUpdateItems = (items: items): void => {
    updateItems(items);
  };

  const handleTodoDialogOpen = (): void => {
    setTodoOpen(true);
  };

  const handleTodoDialogClose = (): void => {
    setTodoOpen(false);
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleKeyDownClose = (event: KeyboardEvent) => {
    if (
      isDrawerOpen &&
      (event.key === "Escape" ||
        event.key === "Backspace" ||
        event.key === "Delete")
    ) {
      toggleDrawer(false);
    }
  };

  const handleSortIconClick = (): void => {
    switch (sortOption) {
      case 0:
        setSortOption(1);
        break;
      case 1:
        setSortOption(-1);
        break;
      case -1:
        setSortOption(0);
        break;
    }
  };

  const handlePomodoStart = (): void => {
    if (pomodoInterval) {
      window.clearInterval(pomodoInterval);
    }
    setPomodoInterval(
      window.setInterval(() => setPomodoReady(true), 1000 * 60 * 30)
    );
  };

  const handlePomodoEnd = (): void => {
    window.clearInterval(pomodoInterval);
  };

  const handlePomodoSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setPomodoReady(false);
  };

  return (
    <Container>
      <TopBar toggleDrawer={toggleDrawer} />
      <EventListener target={document} onKeyDown={handleKeyDownClose} />
      <SmallDrawer
        toggleDrawer={toggleDrawer}
        open={isDrawerOpen}
        updateItems={handleUpdateItems}
        handlePomodoStart={handlePomodoStart}
        handlePomodoEnd={handlePomodoEnd}
        db={db}
      />
      <TodoDialog
        isOpen={isTodoOpen}
        handleClose={handleTodoDialogClose}
        updateItems={updateItems}
        items={items}
        db={db}
      />
      <TodoListSurface
        sortedItems={sortedItems}
        handleDelete={handleDelete}
        sortType={sortOption}
        handleSortIconClick={handleSortIconClick}
      />
      <Fab
        color="primary"
        onClick={handleTodoDialogOpen}
        className={styles.fab}
      >
        <AddIcon />
      </Fab>
      <Snackbar
        open={isPomodoReady}
        autoHideDuration={8000}
        onClose={handlePomodoSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handlePomodoSnackbarClose}
          severity="warning"
        >
          Pomodo Timer: Time to take a break!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default App;
