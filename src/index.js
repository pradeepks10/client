import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

//provider is used to access state globally
import { Provider } from 'react-redux';

import reducers from './reducers/index.js';

/////**********////
import { applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux';

const store = createStore(reducers,compose(applyMiddleware(thunk)));



ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);