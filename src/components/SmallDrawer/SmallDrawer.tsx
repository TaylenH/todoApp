import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import DeleteAllDialog from '../DeleteAllDialog/DeleteAllDialog';
import { items, myDbs } from '../../utils/types';
import PomodoroDialog from '../PomodoroDialog/PomodoroDialog';

type props = {
    toggleDrawer(open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void,
    open: boolean,
    updateItems(items: items): void,
    handlePomodoroStart(): void,
    handlePomodoroEnd(): void,
    db: myDbs | null
};

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

/**
 * @description - A swipeable side drawer with an additional list of user controls
 * @param toggleDrawer - a callback that opens and closes the drawer
 * @param open - A boolean that controls wether the drawer is open or closed
 * @param updateItems - a callback that fires in order to update the To-do list
 * @param handlePomodoroStart - a callback that handles starting the pomodoro timer
 * @param handlePomodoroEnd - a callback that handles ending the pomodoro timer
 * @param db - a database object that handles connecting to and interacting with the IndexedDB database
 */

const SmallDrawer = ({toggleDrawer, open, updateItems, handlePomodoroStart, handlePomodoroEnd, db}: props) => {
    const classes = useStyles();
    const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
    const [isPomodoroOpen, setPomodoroOpen] = React.useState<boolean>(false);

    const handleDeleteOpen = (): void => {
        setDeleteOpen(true);
    }

    const handleDeleteClose = (): void => {
        setDeleteOpen(false);
    }

    const handleDeleteAll = (): void => {
        const deleteAllFromDatabase = async () => {
            if(db){
                try{
                    await (db as myDbs).deleteAllRecords();
                }catch(e){
                    console.log(e.message);
                }
            }
        }

        updateItems([]);
        deleteAllFromDatabase();
        handleDeleteClose();
    }

    const handlePomodoroDialogOpen = (): void => { 
        setPomodoroOpen(true);
    }

    const handlePomodoroDialogClose = (start: boolean = false): void => {
        if(start){
            handlePomodoroStart();
        }
        setPomodoroOpen(false);
    }

    const sideList = () => (
        <div className={classes.list} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem button onClick={handleDeleteOpen} autoFocus aria-label='Delete All'>
                    <ListItemIcon><DeleteSweepIcon /></ListItemIcon>
                    <ListItemText>Delete All</ListItemText>
                </ListItem>
                <ListItem button onClick={handlePomodoroDialogOpen} aria-label='Pomodoro Timer'>
                    <ListItemIcon><AccessAlarmIcon /></ListItemIcon>
                    <ListItemText>Pomodoro Timer</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor='right'
                open={open}
                onOpen={toggleDrawer(true)}
                onClose={toggleDrawer(false)}
                >
                {sideList()}
            </SwipeableDrawer>
            <DeleteAllDialog handleDeleteAll={handleDeleteAll} isOpen={isDeleteOpen} handleClose={handleDeleteClose} />
            <PomodoroDialog
                handlePomodoroEnd={handlePomodoroEnd}
                handlePomodoroDialogClose={handlePomodoroDialogClose}
                isOpen={isPomodoroOpen}
            />
        </div>
    );
}

export default SmallDrawer;