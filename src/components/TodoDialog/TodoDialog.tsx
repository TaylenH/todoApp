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
import { todoItem, items, myDbs } from '../../utils/types';

type props = {
    isOpen: boolean;
    handleClose(): void;
    updateItems: React.Dispatch<React.SetStateAction<items>>
    items: items;
    db: myDbs | null;
}

type updater = 'name' | 'importance';
type inputE = React.ChangeEvent<HTMLInputElement>;
type blurE = React.FocusEvent<HTMLInputElement>;

const useStyles = makeStyles({});


const TodoDialog: React.FC<props> = ({ isOpen, handleClose, updateItems, items, db }) => {
    const classes = useStyles();

    const [itemName, updateName] = React.useState<string>("");
    const [itemImportance, updateImportance] = React.useState<number>(0);
    const [formErrors, updateErrors] = React.useState<boolean[]>([false, false]);

    function handleUpdate(event: inputE, updater: updater): void {
        switch (updater){
            case 'name':
            updateName(event.target.value);
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
            importance: itemImportance,
            id: uuid()
          }

          const addToDatabase = async () => {
            if(db){
              try{
                await db.addRecord(item.id, item.name, item.importance);
              }catch(e){
                console.log(e.message);
              }
            }
          }
          updateItems([...items, item]);
          addToDatabase();
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
              Please enter the name and importance of your Todo list item
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
