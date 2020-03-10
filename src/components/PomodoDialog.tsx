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
    isOpen: boolean,
    handlePomodoDialogClose(start?: boolean): void,
    handlePomodoEnd(): void
};

const PomodoDialog = ({isOpen, handlePomodoDialogClose, handlePomodoEnd}: props) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => handlePomodoDialogClose()}
            aria-labelledby='pomodo-dialog-title'
        >
            <DialogTitle id='delete-form-title'>Pomodo Timer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Would you like to start a pomodo timer?
                    You Will be notified to take a five minute break every 30 minutes.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={() => handlePomodoDialogClose(true)}>
                    Start timer
                </Button>
                <Button variant='outlined' onClick={() => {
                    handlePomodoEnd();
                    handlePomodoDialogClose();
                }}>
                    Turn off timer
                </Button>
                <Button variant='outlined' onClick={() => {
                    handlePomodoDialogClose();
                }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PomodoDialog;