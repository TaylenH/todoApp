import React from 'react';
import { items, sortType } from './types';
import { Fab, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventListener from 'react-event-listener';
import TodoDialog from './components/TodoDialog';
import TopBar from './components/TopBar';
import SmallDrawer from './components/SmallDrawer';
import AddIcon from '@material-ui/icons/Add';

import TodoListSurface from './components/TodoListSurface';


//Mock Data
const Mock: items = [
  {
    name: 'item 1',
    importance: 1,
    id: '1'
  },
  {
    name: 'item 2',
    importance: 2,
    id: '2'
  },
  {
    name: 'item 3',
    importance: 3,
    id: '3'
  },
  {
    name: 'item 4',
    importance: 4,
    id: '4'
  },
  {
    name: 'item 5',
    importance: 5,
    id: '5'
  },
  {
    name: 'item 6',
    importance: 6,
    id: '6'
  },
  {
    name: 'item 7',
    importance: 7,
    id: '7'
  },
  {
    name: 'item 8',
    importance: 8,
    id: '8'
  },
  {
    name: 'item 9',
    importance: 9,
    id: '9'
  },
];

const useStyles = makeStyles({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
});

const App: React.FC = () => {
    const styles = useStyles();

    const [items, updateItems] = React.useState<items>(Mock);
    const [sortOption, setSortOption] = React.useState<sortType>(0);
    const [isTodoOpen, setTodoOpen] = React.useState<boolean>(false);
    const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);

    let sortedItems = [...items];

    //Sorts the list accordingly based on the sort option selected
    sortOption === 0 || sortedItems.sort((item1, item2) => {
      if(item1.importance > item2.importance){
        return sortOption === 1 ? 1 : -1;
      }else if(item1.importance < item2.importance){
        return sortOption === 1 ? -1 : 1;
      }
      return 0;
    });

    const handleDelete = (id: string): void => {
      updateItems(items.filter(item => item.id !== id));
    }

    const handleUpdateItems = (items: items): void => {
      updateItems(items);
    }

    const handleTodoDialogOpen = (): void => {
      setTodoOpen(true);
    }

    const handleTodoDialogClose = (): void => {
      setTodoOpen(false);
    }

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event && event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')){
              return;
          }
  
      setDrawerOpen(open);
    }

    const handleKeyDownClose = (event: KeyboardEvent) => {
      if(isDrawerOpen && (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Delete')){
          toggleDrawer(false);
      }
    }

    const handleSortIconClick = (): void => {
      switch(sortOption){
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
    }

    return (
      <Container>
        <TopBar toggleDrawer={toggleDrawer} />
        <EventListener target={document} onKeyDown={handleKeyDownClose} />
        <SmallDrawer toggleDrawer={toggleDrawer} open={isDrawerOpen} updateItems={handleUpdateItems} />
        <TodoDialog 
          isOpen={isTodoOpen} 
          handleClose={handleTodoDialogClose}
          updateItems={updateItems}
          items={items}
        />
        <TodoListSurface sortedItems={sortedItems} handleDelete={handleDelete} sortType={sortOption} handleSortIconClick={handleSortIconClick} />
        <Fab color='primary' onClick={handleTodoDialogOpen} className={styles.fab} >
          <AddIcon />
        </Fab>
      </Container>
    );
}

export default App;