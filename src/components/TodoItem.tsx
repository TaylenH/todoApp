import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { todoItem } from '../types';


interface props {
    todoItem: todoItem,
    handleDelete(id: string): void
};

const useStyles = makeStyles({
    box: {
        border: '1px solid black',
    },
    deleteButton: {
        margin: '10px',
        cursor: 'pointer',
        '&:hover': {
            background: 'red'
        }
    }
})

const TodoItem: React.FC<props> = ({ todoItem: todo, handleDelete }) => {
    const styles = useStyles();

    return (
        <>
            <div className={styles.box}>
                {todo.name}
                {todo.description}
                {todo.importance}
                <p onClick={() => handleDelete(todo.id)} className={styles.deleteButton}>XXX</p>
            </div>
        </>
    );
}

export default TodoItem;