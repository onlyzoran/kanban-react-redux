import React from 'react';
import {connect} from 'react-redux';
import Column from '../Column';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {changeCardColumn} from '../../redux/kanban-reducer';

const mapStateToProps = (state) => {
    return {
        columns: state.kanban.columns
    }
};

const ColumnsList = ({columns, ...props}) => {
    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        props.changeCardColumn(result.draggableId, result.source.droppableId, result.destination.droppableId);
    };

    const ColumnsListElements = columns.map(column => (
        <Droppable key={column.id} droppableId={column.id.toString()}>
            {(droppableProvided) => (
                <div
                    ref={droppableProvided.innerRef}
                >
                    <Column
                        id={column.id}
                        title={column.title}
                        createCard={column.createCard}
                        color={column.color}
                    />
                    {droppableProvided.placeholder}
                </div>
            )}
        </Droppable>
    ));

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{display: 'flex'}}>
                {ColumnsListElements}
            </div>
        </DragDropContext>
    )
};

export default connect(mapStateToProps, {changeCardColumn})(ColumnsList);
