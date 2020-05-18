import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import CardActionArea from '@material-ui/core/CardActionArea';
import {connect} from 'react-redux';
import {changeCardColumn, getCardInfo} from '../../redux/kanban-reducer';
import {Draggable} from 'react-beautiful-dnd';
import PanToolIcon from '@material-ui/icons/PanTool';

const mapStateToProps = (state) => {
    return {
        currentCard: state.kanban.currentCard,
        cards: state.kanban.cards
    }
};

const CardsList = ({cards, columnId, ...props}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = (cardId) => {
        props.getCardInfo(cardId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const currentColumnCards = cards.filter(card => card.columnId === columnId);
    const cardElements = currentColumnCards.map((card, index) => (
        <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
            {(draggableProvided) => (
                <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                >
                    <Card style={{marginBottom: '5px'}}>
                        <CardActionArea onClick={() => handleOpen(card.id)}>
                            <CardContent>
                                <Typography variant="subtitle2">
                                    {card.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <PanToolIcon fontSize="small" style={{margin: 'auto'}}/>
                        </CardActions>
                    </Card>
                </div>
            )}
        </Draggable>
    ));

    return (
        <>
            {cardElements}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                <Fade in={open} style={{backgroundColor: '#fff', border: '2px solid #000', padding: '16px 32px 24px'}}>
                    <div>
                        <Typography component="h2">
                            {props.currentCard.title}
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default connect(mapStateToProps, {getCardInfo, changeCardColumn})(CardsList);
