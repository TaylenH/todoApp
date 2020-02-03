import React from 'react';
import { items } from './types';
import { Button } from '@material-ui/core';
import TodoItem from './components/TodoItem';
import TodoDialog from './components/TodoDialog';
import TopBar from './components/TopBar';
import SmallDrawer from './components/SmallDrawer';

const App: React.FC = () => {
    const [items, updateItems] = React.useState<items>([]);
    const [sortOption, setSortOption] = React.useState<string>('time');
    const [isTodoOpen, setTodoOpen] = React.useState<boolean>(false);
    const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(false);

    let sortedItems = [...items];
    sortOption === 'time' || sortedItems.sort((item1, item2) => {
      if(item1.importance > item2.importance){
        return 1;
      }else if(item1.importance < item2.importance){
        return -1;
      }

      return 0;
    });

    const handleDelete = (id: string): void => {
      updateItems(items.filter(item => item.id !== id));
    }

    const handleUpdateItems = (items: items): void => {
      updateItems(items);
    }

    const handleSortSelection = (event : React.ChangeEvent<HTMLInputElement>): void => {
      setSortOption(event.target.value);
    }

    const handleTodoOpen = (): void => {
      setTodoOpen(true);
    }

    const handleTodoClose = (): void => {
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

    return (
      <>
        <TopBar toggleDrawer={toggleDrawer} />
        <Button variant="outlined" color="primary" onClick={handleTodoOpen}>
          Open form dialog
        </Button>
        <SmallDrawer toggleDrawer={toggleDrawer} open={isDrawerOpen} updateItems={handleUpdateItems} />
        <TodoDialog 
          isOpen={isTodoOpen} 
          handleClose={handleTodoClose}
          updateItems={updateItems}
          items={items}
        />
        <form>
          Sort By: <label><input type='radio' value='time' checked={sortOption === 'time'} onChange={e => handleSortSelection(e)} />Time added</label>
          <label><input type='radio' value='importance' checked={sortOption === 'importance'} onChange={e => handleSortSelection(e)} />Importance</label>
        </form>
        <hr/>
        {sortedItems.map((item) => {
          return <TodoItem todoItem={item} handleDelete={handleDelete} key={item.id} />
        })}
      </>
    );
}

export default App;