import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import ColumnsList from './components/ColumnsList';

const App = () => {
    return (
        <Provider store={store}>
            <ColumnsList/>
        </Provider>
    );
}

export default App;
