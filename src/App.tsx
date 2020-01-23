import React from 'react';
import  uuid from 'uuid/v4';
import { todoItem } from './types';
import TodoItem from './components/TodoItem/TodoItem';


type items = todoItem[];
type updater = 'name' | 'description' | 'importance';

const App: React.FC = () => {
    const [items, updateItems] = React.useState<items>([]);
    const [itemName, updateName] = React.useState<string>("");
    const [itemDescription, updateDescription] = React.useState<string>("");
    const [itemImportance, updateImportance] = React.useState<number>(0);
    const [sortOption, setSortOption] = React.useState<string>('time');

    let sortedItems = [...items];
    sortOption === 'time' || sortedItems.sort((item1, item2) => {
      if(item1.importance > item2.importance){
        return 1;
      }else if(item1.importance < item2.importance){
        return -1;
      }

      return 0;
    });

    function handleUpdate(event: React.ChangeEvent<HTMLInputElement>, updater: updater): void {
      switch (updater){
        case 'name':
          updateName(event.target.value);
          break;
        case 'description':
          updateDescription(event.target.value);
          break;
        case 'importance':
          updateImportance(parseInt(event.target.value));
          break;
      }
    }

    function handleAdd(event: React.MouseEvent): void {
      event.preventDefault();
      if(itemName && itemImportance !== 0){
        let item: todoItem = {
          name : itemName,
          description: itemDescription,
          importance: itemImportance,
          id: uuid()
        }
        updateItems([...items, item]);
      }else{
        alert('Please makes sure to enter name and importance');
      }
    }

    function handleDelete(id: string): void{
      updateItems(items.filter(item => item.id !== id));
    }

    function handleSortSelection(event : React.ChangeEvent<HTMLInputElement>): void {
      setSortOption(event.target.value);
    }

    return (
      <>
        <h1>Todo List</h1>
        <form>
          <input type='text' value={itemName} onChange={(e) => handleUpdate(e, 'name')} placeholder='Todo name' />
          <input type='textarea' value={itemDescription} onChange={(e) => handleUpdate(e, 'description')} placeholder='Todo description' />
          Item Importance: <input type='number' value={itemImportance} onChange={(e) => handleUpdate(e, 'importance')} min={1} max={9}/>
          Sort By: <label><input type='radio' value='time' checked={sortOption === 'time'} onChange={e => handleSortSelection(e)} />Time added</label>
          <label><input type='radio' value='importance' checked={sortOption === 'importance'} onChange={e => handleSortSelection(e)} />Importance</label>
          <button value='Add to list' onClick={(e) => handleAdd(e)} >Add to list</button>
        </form>
        <hr/>
        {sortedItems.map((item) => {
          return <TodoItem todoItem={item} handleDelete={handleDelete} key={item.id} />
        })}
      </>
    );
}

export default App;