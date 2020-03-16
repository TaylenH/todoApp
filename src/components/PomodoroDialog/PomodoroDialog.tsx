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

/**
 * @description - Allows the user to set a Pomodoro timer and get notified when they should take a break
 * @param isOpen - boolean that controls wether the dialog window is open or close
 * @param handlePomodoroDialogClose - callback that fires whenever a dialog control is clicked on
 * @param handlePomodoroEnd - callback that fires when the 'End timer' button is clicked
 * @returns ReactNode - A dialog window with controls related to the Pomodoro timer
 */

const PomodoroDialog = ({isOpen, handlePomodoroDialogClose, handlePomodoroEnd}: props) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => handlePomodoroDialogClose()}
            aria-labelledby='Pomodoro-dialog-title'
        >
            <DialogTitle id='Pomodoro-form-title'>Pomodoro Timer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Would you like to start a Pomodoro timer?
                    You Will be notified to take a five minute break every 30 minutes.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={() => handlePomodoroDialogClose(true)} aria-label='Start timer'>
                    Start timer
                </Button>
                <Button variant='outlined' onClick={() => {
                    handlePomodoroEnd();
                    handlePomodoroDialogClose();
                }} aria-label='Turn off timer'>
                    Turn off timer
                </Button>
                <Button variant='outlined' onClick={() => {
                    handlePomodoroDialogClose();
                }} aria-label='Cancel'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PomodoroDialog;