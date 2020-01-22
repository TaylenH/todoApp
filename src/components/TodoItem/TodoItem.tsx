import React from 'react';
import './Styles.css';
import { todoItem } from '../../types';


interface props {
    todoItem: todoItem,
    handleDelete(id: string): void
};

const TodoItem: React.FC<props> = ({ todoItem: todo, handleDelete }) => {
    return (
        <>
            <div className='box'>
                {todo.name}
                {todo.description}
                {todo.importance}
                <p onClick={() => handleDelete(todo.id)} className='deleteButton'>XXX</p>
            </div>
        </>
    );
}

export default TodoItem;