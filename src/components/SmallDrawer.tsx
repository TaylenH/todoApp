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
import DeleteAllDialog from './DeleteAllDialog';
import { items } from '../types';

type props = {
    toggleDrawer(open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void,
    open: boolean,
    updateItems(items: items): void
};

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const SmallDrawer = ({toggleDrawer, open, updateItems}: props) => {
    const classes = useStyles();
    const [isDeleteOpen, setDeleteOpen] = React.useState<boolean>(false);

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

    const sideList = () => (
        <div className={classes.list} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem button onClick={handleDeleteOpen}>
                    <ListItemIcon><DeleteSweepIcon /></ListItemIcon>
                    <ListItemText>Delete All</ListItemText>
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
        </div>
    );
}

export default SmallDrawer;