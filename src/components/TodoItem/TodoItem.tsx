import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { todoItem } from "../../utils/types";
import {
  Paper,
  IconButton,
  Icon
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ImportanceIcon from "../ImportanceIcon/ImportanceIcon";
import CP from "../../color/color";

interface props {
  todoItem: todoItem;
  handleDelete(id: string): void;
}

const useStyles = makeStyles({
  paper: {
    margin: "0 auto 15px",
    height: "40px",
    border: "1px solid black",
    boxShadow: "5px 5px 5px grey",
    width: "90%"
  },
  name: {
    position: "relative",
    left: "25px",
    bottom: "5px",
    fontSize: "1.1rem"
  },
  delete: {
    position: "relative",
    bottom: "58px",
    left: "70%"
  },
  importance: {
    position: "relative",
    bottom: "51px",
    left: "78%"
  },
  color1: {
    backgroundColor: CP.todoPallet.color1
  },
  color2: {
    backgroundColor: CP.todoPallet.color2
  },
  color3: {
    backgroundColor: CP.todoPallet.color3
  },
  color4: {
    backgroundColor: CP.todoPallet.color4
  },
  color5: {
    backgroundColor: CP.todoPallet.color5
  },
  color6: {
    backgroundColor: CP.todoPallet.color6
  },
  color7: {
    backgroundColor: CP.todoPallet.color7
  },
  color8: {
    backgroundColor: CP.todoPallet.color8
  },
  color9: {
    backgroundColor: CP.todoPallet.color9
  }
});

const TodoItem = ({ todoItem: todo, handleDelete }: props) => {
  const styles = useStyles();

  const getColor = () => {
    switch (todo.importance) {
      case 1:
        return styles.color1;
      case 2:
        return styles.color2;
      case 3:
        return styles.color3;
      case 4:
        return styles.color4;
      case 5:
        return styles.color5;
      case 6:
        return styles.color6;
      case 7:
        return styles.color7;
      case 8:
        return styles.color8;
      case 9:
        return styles.color9;
      default:
        return styles.color1;
    }
  };

  let color = getColor();

  return (
    <Paper className={`${styles.paper} ${color}`}>
      <div className={styles.name}>
        <p>{todo.name}</p>
      </div>
      <IconButton
        onClick={() => handleDelete(todo.id)}
        className={styles.delete}
      >
        <Icon>
          <DeleteIcon />
        </Icon>
      </IconButton>
      <Icon className={styles.importance}>
        <ImportanceIcon importance={todo.importance} />
      </Icon>
    </Paper>
  );
};

export default TodoItem;
