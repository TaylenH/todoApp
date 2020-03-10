import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import EventListener from 'react-event-listener';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import DeleteAllDialog from './DeleteAllDialog';
import { items } from '../types';
import PomodoDialog from './PomodoDialog';

type props = {
    toggleDrawer(open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void,
    open: boolean,
    updateItems(items: items): void
    handlePomodoStart(): void
    handlePomodoEnd(): void
};

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const SmallDrawer = ({toggleDrawer, open, updateItems, handlePomodoStart, handlePomodoEnd}: props) => {
    const classes = useStyles();
    const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);
    const [isPomodoOpen, setPomodoOpen] = React.useState<boolean>(false);

    const handleDeleteOpen = (): void => {
        setDeleteOpen(true);
    }

    const handleDeleteClose = (): void => {
        setDeleteOpen(false);
    }

    const handleDeleteAll = (): void => {
        updateItems([]);
        handleDeleteClose();
    }

    const handlePomodoDialogOpen = (): void => { 
        setPomodoOpen(true);
    }

    const handlePomodoDialogClose = (start: boolean = false): void => {
        if(start){
            handlePomodoStart();
        }
        setPomodoOpen(false);
    }

    const sideList = () => (
        <div className={classes.list} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem button onClick={handleDeleteOpen} autoFocus>
                    <ListItemIcon><DeleteSweepIcon /></ListItemIcon>
                    <ListItemText>Delete All</ListItemText>
                </ListItem>
                <ListItem button onClick={handlePomodoDialogOpen} >
                    <ListItemIcon><AccessAlarmIcon /></ListItemIcon>
                    <ListItemText>Pomodo Timer</ListItemText>
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
            <PomodoDialog
                handlePomodoEnd={handlePomodoEnd}
                handlePomodoDialogClose={handlePomodoDialogClose}
                isOpen={isPomodoOpen}
            />
        </div>
    );
}

export default SmallDrawer;