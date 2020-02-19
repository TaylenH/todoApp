import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { todoItem } from '../types';
import { Paper } from '@material-ui/core';


interface props {
    todoItem: todoItem,
    handleDelete(id: string): void,
    isFinal?: boolean
};

const useStyles = makeStyles({
    deleteButton: {
        margin: '10px',
        cursor: 'pointer',
        '&:hover': {
            background: 'red'
        }
    },
    paper: {
        marginBottom: '10px',
    },
    finalPaper: {
        marginBottom: '80px'
    }
})

const TodoItem: React.FC<props> = ({ todoItem: todo, handleDelete, isFinal = false }) => {
    const styles = useStyles();

    return (
        <Paper className={!isFinal ? styles.paper : styles.finalPaper}>
            {todo.name}
            {todo.description ? todo.description : ''}
            {todo.importance}
            <p onClick={() => handleDelete(todo.id)} className={styles.deleteButton}>XXX</p>
        </Paper>
    );
}

export default TodoItem;