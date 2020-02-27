import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { todoItem } from "../types";
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  IconButton,
  Icon
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ImportanceIcon from './ImportanceIcon';

interface props {
  todoItem: todoItem;
  handleDelete(id: string): void;
}

const useStyles = makeStyles({
  deleteButton: {
    margin: "10px",
    cursor: "pointer",
    "&:hover": {
      background: "red"
    }
  },
  paper: {
    margin: "0 auto 15px",
    height: "40px",
    backgroundColor: "red",
    border: '1px solid black',
    boxShadow: '5px 5px 5px grey',
    width: '90%'
  },
  name: {
    position: 'relative',
    left: '25px',
    bottom: '5px',
    fontSize: '1.1rem'
  },
  delete: {
      position: 'relative',
      bottom: '58px',
      left: '70%',
  },
  importance: {
    position: 'relative',
    bottom: '51px',
    left: '78%',
  }
});

const TodoItem = ({ todoItem: todo, handleDelete }: props) => {
  const styles = useStyles();

  let [isExpanded, setExpanded] = React.useState<boolean>(false);
  const handleExpansion = () => setExpanded(isExpanded ? false : true);

  if (todo.description) {
    return (
      <>
        <ExpansionPanel expanded={isExpanded} onClick={() => handleExpansion()}>
          <ExpansionPanelSummary>
            {todo.name}
            {todo.importance}
            <p
              onClick={() => handleDelete(todo.id)}
              className={styles.deleteButton}
            >
              XXX
            </p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{todo.description}</ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  } else {
    return (
      <Paper className={styles.paper}>
        <div className={styles.name}>
            <p>{todo.name}</p>
        </div>
        <IconButton onClick={() => handleDelete(todo.id)} className={styles.delete}>
            <Icon >
                <DeleteIcon />
            </Icon>
        </IconButton>
        <Icon className={styles.importance} >
            <ImportanceIcon importance={todo.importance} />
        </Icon>
      </Paper>
    );
  }
};

export default TodoItem;
