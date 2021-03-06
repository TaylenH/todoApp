import React from 'react';
import {
    AppBar,
    Toolbar,
    useScrollTrigger,
    Slide,
    IconButton,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

type props = {
    toggleDrawer(open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void
}

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
});


const HideOnScroll: React.FC = ({ children }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

/**
 * @description - The App bar holds the Apps title and a hamburger icon that opens a drawer with user actions
 * @param toggleDrawer - a callback responsible for opening the swipeable drawer when the hamburger icon is clicked
 */

const TopBar = ({toggleDrawer}: props) => {
    const classes = useStyles();

    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} aria-label='To-Do'>To-Do</Typography>
                        <IconButton edge="end" color="inherit" type="button" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}

export default TopBar;