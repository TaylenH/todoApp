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

    function handleAdd(event: React.MouseEvent ): void {
      event.preventDefault();
      let item: todoItem = {
        name : itemName,
        description: itemDescription,
        importance: itemImportance,
        id: uuid()
      }
      updateItems([...items, item]);
    }

    function handleDelete(id: string): void{
      updateItems(items.filter(item => item.id !== id));
    }

    return (
      <>
        <h1>Todo List</h1>
        <form>
          <input type='text' value={itemName} onChange={(e) => handleUpdate(e, 'name')} placeholder='Todo name' />
          <input type='textarea' value={itemDescription} onChange={(e) => handleUpdate(e, 'description')} placeholder='Todo description' />
          Item Importance: <input type='number' value={itemImportance} onChange={(e) => handleUpdate(e, 'importance')} />
          <button value='Add to list' onClick={(e) => handleAdd(e)} >Add to list</button>
        </form>
        <hr/>
        {items.map((item) => {
          return <TodoItem todoItem={item} handleDelete={handleDelete} key={item.id} />
        })}
      </>
    );
}

export default App;