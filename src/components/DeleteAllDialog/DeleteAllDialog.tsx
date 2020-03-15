import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';

type props = {
    handleDeleteAll(): void,
    isOpen: boolean,
    handleClose(): void
}

const DeleteAllDialog = ({handleDeleteAll, isOpen, handleClose}: props) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby='delete-dialog-title'
        >
            <DialogTitle id='delete-form-title'>Delete All</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete everything?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={handleDeleteAll}>
                    Delete All
                </Button>
                <Button variant='outlined' onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteAllDialog;