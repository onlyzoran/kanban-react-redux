import React from 'react';
import {connect} from 'react-redux';
import Column from '../Column';

const mapStateToProps = (state) => {
    return {
        columns: state.kanban.columns
    }
};

const ColumnsList = ({columns}) => {
    columns.sort((a, b) => (a.order > b.order) ? 1 : -1);
    const firstColumnNumber = columns[0].order;
    const lastColumnNumber = columns[columns.length - 1].order;

    const ColumnsListElements = columns.map(column => (
        <Column
            key={column.id}
            id={column.id}
            title={column.title}
            createCard={column.createCard}
            color={column.color}
            isFirstColumn={column.order === firstColumnNumber}
            isLastColumn={column.order === lastColumnNumber}
        />
    ));

    return (
        <div style={{display: 'flex'}}>
            {ColumnsListElements}
        </div>
    )
};

export default connect(mapStateToProps)(ColumnsList);