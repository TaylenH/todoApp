import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import uuid from "uuid/v4";
import { ToDoItemShape, items, myDbs } from "../../utils/types";

type props = {
  isOpen: boolean;
  handleClose(): void;
  updateItems: React.Dispatch<React.SetStateAction<items>>;
  items: items;
  db: myDbs | null;
};

type updater = "name" | "importance";
type inputE = React.ChangeEvent<HTMLInputElement>;
type blurE = React.FocusEvent<HTMLInputElement>;

const useStyles = makeStyles({});

/**
 * @description - The ToDoDialog is a dialog window responsible for entering in information for a new To-Do list item
 * @param isOpen - boolean that controls wether the dialog window is open or not
 * @param handleClose - callback that handles closing the window
 * @param updateItems - callback that handles updating the To-Do list in state
 * @param items - the sorted list of To-Do items
 * @param db - database object responsible for interacting with indexedDB
 */

const ToDoDialog = ({
  isOpen,
  handleClose,
  updateItems,
  items,
  db
}: props) => {
  const classes = useStyles();

  const [itemName, updateName] = React.useState<string>("");
  const [itemImportance, updateImportance] = React.useState<number>(0);
  const [formErrors, updateErrors] = React.useState<boolean[]>([false, false]);

  function handleUpdate(event: inputE, updater: updater): void {
    switch (updater) {
      case "name":
        updateName(event.target.value);
        break;
      case "importance":
        updateImportance(parseInt(event.target.value));
        break;
    }
  }

  function handleAdd(event: React.MouseEvent): void {
    event.preventDefault();
    if (
      itemName &&
      itemImportance !== 0 &&
      formErrors[0] !== true &&
      formErrors[1] !== true
    ) {
      let item: ToDoItemShape = {
        name: itemName,
        importance: itemImportance,
        id: uuid()
      };

      const addToDatabase = async () => {
        if (db) {
          try {
            await db.addRecord(item.id, item.name, item.importance);
          } catch (e) {
            console.log(e.message);
          }
        }
      };
      updateItems([...items, item]);
      addToDatabase();
      handleClose();
    } else {
      alert("Please make sure to enter a Name between 3 and 32 characters, and an Importance between 1 and 9");
    }
  }

  function handleBlur(event: blurE, updater: updater): void {
    switch (updater) {
      case "name":
        if (event.target.value.length < 3 || event.target.value.length > 32) {
          updateErrors([true, formErrors[1]]);
        } else if (formErrors[0] === true) {
          updateErrors([false, formErrors[1]]);
        }
        break;
      case "importance":
        let importance = parseInt(event.target.value);
        if (importance < 1 || importance > 9) {
          updateErrors([formErrors[0], true]);
        } else if (formErrors[1] === true) {
          updateErrors([formErrors[0], false]);
        }
        break;
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New To-Do list item</DialogTitle>
        <Container>
          <TextField
            autoFocus
            helperText="Please enter To-Do name between 3 and 32 characters"
            id="ToDoNameField"
            label="Name"
            name="ToDoNameField"
            onChange={e => handleUpdate(e as inputE, "name")}
            placeholder="Enter Item Name"
            required
            type="text"
            onBlur={e => handleBlur(e as blurE, "name")}
            error={formErrors[0]}
          />
          <TextField
            id="ToDoImportanceField"
            helperText="Please enter an Importance value between 1 and 9"
            label="importance"
            onChange={e => handleUpdate(e as inputE, "importance")}
            required
            type="number"
            onBlur={e => handleBlur(e as blurE, "importance")}
            error={formErrors[1]}
          />
        </Container>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={e => handleAdd(e)} color="primary">
            Add to list
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToDoDialog;
