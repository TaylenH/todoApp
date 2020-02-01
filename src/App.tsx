import React from 'react';
import { items } from './types';
import { Button } from '@material-ui/core';
import TodoItem from './components/TodoItem';
import TodoDialog from './components/TodoDialog';
import TopBar from './components/TopBar';

const App: React.FC = () => {
    const [items, updateItems] = React.useState<items>([]);
    const [sortOption, setSortOption] = React.useState<string>('time');
    const [isOpen, setOpen] = React.useState<boolean>(false);

    let sortedItems = [...items];
    sortOption === 'time' || sortedItems.sort((item1, item2) => {
      if(item1.importance > item2.importance){
        return 1;
      }else if(item1.importance < item2.importance){
        return -1;
      }

      return 0;
    });

    function handleDelete(id: string): void{
      updateItems(items.filter(item => item.id !== id));
    }

    function handleSortSelection(event : React.ChangeEvent<HTMLInputElement>): void {
      setSortOption(event.target.value);
    }

    function handleClickOpen(): void {
      setOpen(true);
    }

    function handleClickClose(): void {
      setOpen(false);
    }

    return (
      <>
        <TopBar />
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <TodoDialog 
          isOpen={isOpen} 
          handleClose={handleClickClose}
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