import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { todoItem } from '../types';
import { Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';


interface props {
    todoItem: todoItem,
    handleDelete(id: string): void,
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
    }
})

const TodoItem: React.FC<props> = ({ todoItem: todo, handleDelete}) => {
    const styles = useStyles();

    let [isExpanded, setExpanded] = React.useState<boolean>(false);
    const handleExpansion = () => setExpanded(isExpanded ? false : true);

    let item;


    if(todo.description){
        item = <>
            <ExpansionPanel expanded={isExpanded} onClick={() => handleExpansion()}>
                <ExpansionPanelSummary>
                    {todo.name}
                    {todo.importance}
                    <p onClick={() => handleDelete(todo.id)} className={styles.deleteButton}>XXX</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {todo.description}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>;
    }else{
        item = <Paper className={styles.paper}>
        {todo.name}
        {todo.importance}
        <p onClick={() => handleDelete(todo.id)} className={styles.deleteButton}>XXX</p>
        </Paper>;
    }

    return (
        item
    );
}

export default TodoItem;