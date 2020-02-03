import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import uuid from 'uuid/v4';
import { todoItem, items } from '../types';

type props = {
    isOpen: boolean;
    handleClose(): void;
    updateItems: React.Dispatch<React.SetStateAction<items>>
    items: items;
}

type updater = 'name' | 'description' | 'importance';
type inputE = React.ChangeEvent<HTMLInputElement>;
type blurE = React.FocusEvent<HTMLInputElement>;

const useStyles = makeStyles({});

const TodoDialog: React.FC<props> = ({ isOpen, handleClose, updateItems, items }) => {
    const classes = useStyles();

    const [itemName, updateName] = React.useState<string>("");
    const [itemDescription, updateDescription] = React.useState<string>("");
    const [itemImportance, updateImportance] = React.useState<number>(0);
    const [formErrors, updateErrors] = React.useState<boolean[]>([false, false]);

    function handleUpdate(event: inputE, updater: updater): void {
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
        if(itemName && itemImportance !== 0 && formErrors[0] !== true && formErrors[1] !== true){
          let item: todoItem = {
            name : itemName,
            description: itemDescription,
            importance: itemImportance,
            id: uuid()
          }
          updateItems([...items, item]);
          handleClose();
        }else{
          alert('Please makes sure to enter name and importance');
        }
      }

      function handleBlur(event: blurE, updater: updater): void {
          switch(updater){
              case 'name':
                  if(event.target.value.length < 3){
                      updateErrors([true, formErrors[1]]);
                  }else if(formErrors[0] === true){
                    updateErrors([false, formErrors[1]]);
                  }
                break;
                case 'importance':
                    let importance = parseInt(event.target.value);
                    if(importance < 1 || importance > 9){
                        updateErrors([formErrors[0], true]);
                    }else if(formErrors[1] === true){
                        updateErrors([formErrors[0], false]);
                    }
                    break;
          }
      }

  return (
    <>
      <div>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Todo list item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name and importance of your Todo list item,
              optionally you may enter a reminder description.
            </DialogContentText>
          </DialogContent>
          <TextField
            autoFocus
            helperText='Please enter Todo name'
            id='todoNameField'
            label='Name'
            name='todoNameField'
            onChange={e => handleUpdate((e as inputE), 'name')}
            placeholder='Enter Item Name'
            required
            type='text'
            onBlur={e => handleBlur((e as blurE), 'name')}
            error={formErrors[0]}
          />
          <TextField
            id='todoDescriptionField'
            label='Description'
            onChange={e => handleUpdate((e as inputE), 'description')}
            placeholder='Enter Item Description'
            type='textarea'
          />
          <TextField
            id='todoImportanceField'
            label='importance'
            onChange={e => handleUpdate((e as inputE), 'importance')}
            required
            type='number'
            onBlur={e => handleBlur((e as blurE), 'importance')}
            error={formErrors[1]}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={e => handleAdd(e)} color="primary">
              Add to list 
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default TodoDialog;
