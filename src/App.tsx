import React from "react";
import { items, sortType, myDbs, dbsToDos } from "./utils/types";
import { Fab, Container, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import EventListener from "react-event-listener";
import ToDoDialog from "./components/ToDoDialog/ToDoDialog";
import TopBar from "./components/TopBar/TopBar";
import SmallDrawer from "./components/SmallDrawer/SmallDrawer";
import AddIcon from "@material-ui/icons/Add";

import ToDoListSurface from "./components/ToDolistSurface/ToDoListSurface";
import { openConnection } from "./utils/indexedUtils";

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
  const [isToDoOpen, setToDoOpen] = React.useState<boolean>(false);
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [isPomodoroReady, setPomodoroReady] = React.useState<boolean>(false);
  const [PomodoroInterval, setPomodoroInterval] = React.useState<number>(0);
  const [db, setDb] = React.useState<myDbs | null>(null);

  let sortedItems = [...items];

  React.useEffect(() => {
    const establishConnection = async () => {
      console.log("establish connection");
      let request = await openConnection();
      setDb(request);
      return request;
    };
    const getToDos = async (database: myDbs) => {
      console.log(database);
      if (database) {
        let list = await database.readAllToDos();
        let ToDoList: items = list.map(item => {
          return {
            id: item.id,
            name: item.ToDoDescription,
            importance: item.ToDoImportance
          };
        });
        updateItems(ToDoList);
      }
    };

    try {
      establishConnection().then(database => getToDos(database));
    } catch (e) {
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
      if (db) {
        try {
          await (db as myDbs).deleteRecord(id);
        } catch (e) {
          console.log(e.message);
        }
      }
    };
    updateItems(items.filter(item => item.id !== id));
    deleteFromDatabase();
  };

  const handleUpdateItems = (items: items): void => {
    updateItems(items);
  };

  const handleToDoDialogOpen = (): void => {
    setToDoOpen(true);
  };

  const handleToDoDialogClose = (): void => {
    setToDoOpen(false);
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

  const handlePomodoroStart = (): void => {
    if (PomodoroInterval) {
      window.clearInterval(PomodoroInterval);
    }
    setPomodoroInterval(
      window.setInterval(() => setPomodoroReady(true), 1000 * 60 * 30)
    );
  };

  const handlePomodoroEnd = (): void => {
    window.clearInterval(PomodoroInterval);
  };

  const handlePomodoroSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setPomodoroReady(false);
  };

  return (
    <Container>
      <TopBar toggleDrawer={toggleDrawer} />
      <EventListener target={document} onKeyDown={handleKeyDownClose} />
      <SmallDrawer
        toggleDrawer={toggleDrawer}
        open={isDrawerOpen}
        updateItems={handleUpdateItems}
        handlePomodoroStart={handlePomodoroStart}
        handlePomodoroEnd={handlePomodoroEnd}
        db={db}
      />
      <ToDoDialog
        isOpen={isToDoOpen}
        handleClose={handleToDoDialogClose}
        updateItems={updateItems}
        items={items}
        db={db}
      />
      <ToDoListSurface
        sortedItems={sortedItems}
        handleDelete={handleDelete}
        sortType={sortOption}
        handleSortIconClick={handleSortIconClick}
      />
      <Fab
        color="primary"
        onClick={handleToDoDialogOpen}
        className={styles.fab}
      >
        <AddIcon />
      </Fab>
      <Snackbar
        open={isPomodoroReady}
        autoHideDuration={8000}
        onClose={handlePomodoroSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handlePomodoroSnackbarClose}
          severity="warning"
        >
          Pomodoro Timer: Time to take a break!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default App;
