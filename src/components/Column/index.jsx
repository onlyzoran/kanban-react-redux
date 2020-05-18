import React, {useState} from 'react';
import style from './style.module.css';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CardsList from '../CardsList';
import {connect} from 'react-redux';
import {addNewCard} from '../../redux/kanban-reducer';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = (state) => {
    return {
        cards: state.kanban.cards
    }
};

const Column = ({id, title, createCard, color, isFirstColumn, isLastColumn, ...props}) => {
    const [adding, setAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const addButtonClick = () => {
        props.addNewCard(newTitle, id);
        setNewTitle('');
        setAdding(false);
    };

    const closeButtonClick = () => {
        setNewTitle('');
        setAdding(false);
    };

    return (
        <div className={style.column}>
            <div className={style.columnHead}>
                <div className={style.columnTitle}>
                    <FiberManualRecordIcon style={{ fontSize: 10, marginRight: '5px', color: color }} />
                    <Typography component="p">
                        {title}
                    </Typography>
                </div>
                {createCard &&
                    <IconButton size="small" onClick={() => setAdding(true)}>
                        <AddIcon fontSize="inherit"/>
                    </IconButton>
                }
            </div>
            <div className={style.columnBody}>
                <CardsList columnId={id} isFirstColumn={isFirstColumn} isLastColumn={isLastColumn} />
                {adding &&
                    <Card style={{marginBottom: '5px'}}>
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <TextField id="standard-basic" label="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                            </form>
                        </CardContent>
                        <CardActions>
                            <IconButton size="small" color="secondary" onClick={() => closeButtonClick()} style={{marginLeft: 'auto'}}>
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                            <IconButton size="small" color="primary" onClick={() => addButtonClick()}>
                                <CheckIcon fontSize="inherit"/>
                            </IconButton>
                        </CardActions>
                    </Card>
                }
            </div>
        </div>
    );
}

export default connect(mapStateToProps, {addNewCard})(Column);