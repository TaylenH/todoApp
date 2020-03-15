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
    handlePomodoroDialogClose(start?: boolean): void,
    handlePomodoroEnd(): void
};

const PomodoroDialog = ({isOpen, handlePomodoroDialogClose, handlePomodoroEnd}: props) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => handlePomodoroDialogClose()}
            aria-labelledby='Pomodoro-dialog-title'
        >
            <DialogTitle id='delete-form-title'>Pomodoro Timer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Would you like to start a Pomodoro timer?
                    You Will be notified to take a five minute break every 30 minutes.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={() => handlePomodoroDialogClose(true)}>
                    Start timer
                </Button>
                <Button variant='outlined' onClick={() => {
                    handlePomodoroEnd();
                    handlePomodoroDialogClose();
                }}>
                    Turn off timer
                </Button>
                <Button variant='outlined' onClick={() => {
                    handlePomodoroDialogClose();
                }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PomodoroDialog;