import React from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { items, sortType } from '../../utils/types';
import ToDoItem from '../ToDoItem/ToDoItem';

type props = {
    sortedItems: items,
    handleDelete(id: string): void,
    sortType: sortType,
    handleSortIconClick(): void
};

const useStyles = makeStyles({
    mainSurface : {
        margin: '30px auto auto',
        width: '90%',
        display: 'flex',
        flexFlow: 'row nowrap'
    },
    nameLabel: {
        selfAlign: 'center',
        flexBasis: '85%'
    },
    importanceBox: {
        alignSelf: 'center',
        flexBasis: '15%',
        display: 'flex',
        flexFlow: 'row nowrap'
    },
    fullSurface: {
        marginBottom: '80px',
        paddingBottom: '10px'
    }
});

/**
 * @description - The container that holds the headers and the visual list of To-Do items
 * @param sortedItems - the To-Do list in state after its been sorted
 * @param handleDelete - a callback responsible for deleting To-Do items
 * @param sortType - The way the user has selected to sort the To-Do list
 * @param handleSortIconClick - a callback responsible for changing the sortTYpe when the icon is clicked
 */

const ToDoListSurface = ({sortedItems, handleDelete, sortType, handleSortIconClick}: props) => {
    const styles = useStyles();

    const renderIcon = (): React.ReactNode => {
        switch(sortType){
            case 0:
                return (
                    <IconButton type='button' onClick={() => handleSortIconClick()} aria-label='Sort by Time'>
                        <RemoveIcon />
                    </IconButton>
                );
            case 1:
                return (
                    <IconButton type='button' onClick={() => handleSortIconClick()} aria-label='Sort Ascending by Importance'>
                        <ArrowUpwardIcon />
                    </IconButton>
                );
            case -1:
                return (
                    <IconButton type='button' onClick={() => handleSortIconClick()} aria-label='Sort Descending by Importance'>
                        <ArrowDownwardIcon />
                    </IconButton>
                );
        }
    };

    return (
        <Paper className={styles.fullSurface}>
            <div className={styles.mainSurface}>
                <h4 className={styles.nameLabel} aria-label='Name'>Name</h4>
                <div className={styles.importanceBox}>
                    <h4 aria-label='Importance'>Importance</h4>
                    {renderIcon()}
                </div>
            </div>
            <hr />
            {sortedItems.map(item => {
                return <ToDoItem
                    ToDoItem={item}
                    handleDelete={handleDelete}
                    key={item.id}
                />
            })}
        </Paper>
    );
}

export default ToDoListSurface;