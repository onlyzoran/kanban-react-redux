import {combineReducers, createStore, applyMiddleware} from 'redux';
import kanbanReducer from './kanban-reducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
    kanban: kanbanReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;