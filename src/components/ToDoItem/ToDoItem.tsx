import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ToDoItemShape } from "../../utils/types";
import {
  Paper,
  IconButton,
  Icon
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ImportanceIcon from "../ImportanceIcon/ImportanceIcon";
import CP from "../../color/color";

interface props {
  ToDoItem: ToDoItemShape;
  handleDelete(id: string): void;
}

const useStyles = makeStyles({
  paper: {
    margin: "0 auto 15px",
    height: "40px",
    border: "1px solid black",
    boxShadow: "5px 5px 5px grey",
    width: "90%",
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '0 5px 0 5px'
  },
  name: {
    alignSelf: 'center',
    fontSize: "1.1rem",
    flexBasis: '70%'
  },
  delete: {
    alignSelf: 'center',
    flexBasis: '20%'
  },
  importance: {
    alignSelf: 'center',
    flexBasis: '10%'
  },
  color1: {
    backgroundColor: CP.ToDoPallet.color1
  },
  color2: {
    backgroundColor: CP.ToDoPallet.color2
  },
  color3: {
    backgroundColor: CP.ToDoPallet.color3
  },
  color4: {
    backgroundColor: CP.ToDoPallet.color4
  },
  color5: {
    backgroundColor: CP.ToDoPallet.color5
  },
  color6: {
    backgroundColor: CP.ToDoPallet.color6
  },
  color7: {
    backgroundColor: CP.ToDoPallet.color7
  },
  color8: {
    backgroundColor: CP.ToDoPallet.color8
  },
  color9: {
    backgroundColor: CP.ToDoPallet.color9
  }
});

const ToDoItem = ({ ToDoItem: ToDo, handleDelete }: props) => {
  const styles = useStyles();

  const getColor = () => {
    switch (ToDo.importance) {
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
        <p>{ToDo.name}</p>
      </div>
      <IconButton
        onClick={() => handleDelete(ToDo.id)}
        className={styles.delete}
        aria-label='Delete ToDo Item'
      >
        <Icon>
          <DeleteIcon />
        </Icon>
      </IconButton>
      <Icon className={styles.importance}>
        <ImportanceIcon importance={ToDo.importance} />
      </Icon>
    </Paper>
  );
};

export default ToDoItem;
