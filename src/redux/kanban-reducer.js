const CHANGE_CARD = 'kanban/CHANGE_CARD';
const ADD_CARD = 'kanban/ADD_CARD';
const GET_CARD = 'kanban/GET_CARD';

const initialState = {
    columns: [
        {
            id: 1,
            order: 0,
            title: 'Наряды',
            createCard: true,
            color: 'lightgray'
        },
        {
            id: 2,
            order: 1,
            title: 'В работе',
            createCard: false,
            color: 'lightgreen'
        },
        {
            id: 3,
            order: 2,
            title: 'Приемка',
            createCard: false,
            color: 'orange'
        },
        {
            id: 4,
            order: 3,
            title: 'Завершено',
            createCard: false,
            color: 'blue'
        },
    ],
    cards: [
        {
            id: 1,
            title: 'Установка плит под фундамент',
            columnId: 1
        },
        {
            id: 2,
            title: 'Земельные работы по подготовке площадки для несущей стены',
            columnId: 1
        },
        {
            id: 3,
            title: 'Установка плит под фундамент 2',
            columnId: 2
        },
        {
            id: 4,
            title: 'Установка плит под фундамент 3',
            columnId: 2
        },
        {
            id: 5,
            title: 'Земельные работы по подготовке площадки для несущей стены 2',
            columnId: 3
        },
        {
            id: 6,
            title: 'Установка плит под фундамент 4',
            columnId: 3
        },
        {
            id: 7,
            title: 'Установка плит под фундамент 5',
            columnId: 4
        },
        {
            id: 8,
            title: 'Установка плит под фундамент 6',
            columnId: 4
        }
    ],
    currentCard: {}
};

const kanbanReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CARD: {
            const newCards = [...state.cards];
            const cardIndex = state.cards.findIndex(card => card.id === action.cardId);
            const sortColumns = [...state.columns];
            sortColumns.sort((a, b) => (a.order > b.order) ? 1 : -1);
            const oldColumnId = state.cards.find(card => card.id === action.cardId).columnId;
            const oldColumn = state.columns.find(column => column.id === oldColumnId);
            const oldColumnIndex = sortColumns.indexOf(oldColumn);
            const newColumnId = sortColumns[oldColumnIndex + action.changer].id;
            newCards[cardIndex].columnId = newColumnId;

            return {
                ...state,
                cards: newCards
            };
        }
        case ADD_CARD: {
            const newId = Math.max.apply(Math, [...state.cards].map((card) => (card.id)));

            const newCard = {
                id: newId + 1,
                title: action.title,
                columnId: action.columnId
            };

            return {
                ...state,
                cards: [...state.cards, newCard]
            }
        }
        case GET_CARD: {
            const newCurrentCard = state.cards.find(card => card.id === action.cardId)

            return {
                ...state,
                currentCard: newCurrentCard
            }
        }
        default: {
            return state;
        }
    }
};

const changeCard = (cardId, changer) => ({
    type: CHANGE_CARD,
    cardId,
    changer
})

const addCard = (title, columnId) => ({
    type: ADD_CARD,
    title,
    columnId
})

const getCard = (cardId) => ({
    type: GET_CARD,
    cardId
})

export const changeCardColumn = (cardId, changer) => {
    return (dispatch) => {
        dispatch(changeCard(cardId, changer));
    }
};

export const addNewCard = (title, columnId) => {
    return (dispatch) => {
        dispatch(addCard(title, columnId));
    }
};

export const getCardInfo = (cardId) => {
    return (dispatch) => {
        dispatch(getCard(cardId));
    }
};

export default kanbanReducer;