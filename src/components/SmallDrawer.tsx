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

type props = {
    toggleDrawer(open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void,
    open: boolean,
    handleDeleteAll(): void
};

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const SmallDrawer = ({toggleDrawer, open, handleDeleteAll}: props) => {
    const classes = useStyles();

    const sideList = () => (
        <div className={classes.list} role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem button onClick={() => handleDeleteAll()}>
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
        </div>
    );
}

export default SmallDrawer;