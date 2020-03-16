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
            return <Filter1Icon aria-label='Importance Icon 1'/>
        case 2: 
            return <Filter2Icon aria-label='Importance Icon 2'/>
        case 3:
            return <Filter3Icon aria-label='Importance Icon 3'/>
        case 4:
            return <Filter4Icon aria-label='Importance Icon 4'/>
        case 5:
            return <Filter5Icon aria-label='Importance Icon 5'/>
        case 6:
            return <Filter6Icon aria-label='Importance Icon 6'/>
        case 7:
            return <Filter7Icon aria-label='Importance Icon 7'/>
        case 8:
            return <Filter8Icon aria-label='Importance Icon 8'/>
        case 9:
            return <Filter9Icon aria-label='Importance Icon 9'/>
        default:
            return <Filter1Icon aria-label='Importance Icon 1'/>
    }
}

export default ImportanceIcon;