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
        margin: '30px 5% auto 5%',
        display: 'flex',
        flexFlow: 'column no-wrap'
    },
    nameLabel: {
        flex: '1 1 65%'
    },
    importanceBox: {
        flex: '1 1 30%',
        display: 'flex',
        alignItems: 'center'
    },
    fullSurface: {
        marginBottom: '80px',
        paddingBottom: '10px'
    }
})

const ToDoListSurface = ({sortedItems, handleDelete, sortType, handleSortIconClick}: props) => {
    const styles = useStyles();

    const renderIcon = (): React.ReactNode => {
        switch(sortType){
            case 0:
                return (
                    <IconButton type='button' onClick={() => handleSortIconClick()}>
                        <RemoveIcon />
                    </IconButton>
                );
            case 1:
                return (
                    <IconButton type='button' onClick={() => handleSortIconClick()}>
                        <ArrowUpwardIcon />
                    </IconButton>
                );
            case -1:
                return (
                    <IconButton type='button' onClick={() => handleSortIconClick()}>
                        <ArrowDownwardIcon />
                    </IconButton>
                );
        }
    };

    return (
        <Paper className={styles.fullSurface}>
            <div className={styles.mainSurface}>
                <h4 className={styles.nameLabel}>Name</h4>
                <div className={styles.importanceBox}>
                    <h4>Importance</h4>
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