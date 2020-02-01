import React from 'react';
import {
    AppBar,
    Toolbar,
    useScrollTrigger,
    Slide
} from '@material-ui/core';

const HideOnScroll: React.FC = ({ children }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

const TopBar: React.FC = () => {
    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        Scroll to hide toolbar
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
}

export default TopBar;