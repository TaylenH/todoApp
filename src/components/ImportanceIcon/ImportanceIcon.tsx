import React from 'react';
import Filter1Icon from '@material-ui/icons/Filter1TwoTone';
import Filter2Icon from '@material-ui/icons/Filter2TwoTone';
import Filter3Icon from '@material-ui/icons/Filter3TwoTone';
import Filter4Icon from '@material-ui/icons/Filter4TwoTone';
import Filter5Icon from '@material-ui/icons/Filter5TwoTone';
import Filter6Icon from '@material-ui/icons/Filter6TwoTone';
import Filter7Icon from '@material-ui/icons/Filter7TwoTone';
import Filter8Icon from '@material-ui/icons/Filter8TwoTone';
import Filter9Icon from '@material-ui/icons/Filter9TwoTone';

type props = {
    importance: number
};

const ImportanceIcon = ({ importance }: props) => {
    switch(importance){
        case 1:
            return <Filter1Icon />
        case 2: 
            return <Filter2Icon />
        case 3:
            return <Filter3Icon />
        case 4:
            return <Filter4Icon />
        case 5:
            return <Filter5Icon />
        case 6:
            return <Filter6Icon />
        case 7:
            return <Filter7Icon />
        case 8:
            return <Filter8Icon />
        case 9:
            return <Filter9Icon />
        default:
            return <Filter1Icon />
    }
}

export default ImportanceIcon;