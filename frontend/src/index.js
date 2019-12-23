import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import CreateSagaMiddleware from 'redux-saga';
import authReducer from './redux/reducers/auth';
import coursesReducer from './redux/reducers/courses';
import studentReducer from './redux/reducers/students';
import examinationReducer from './redux/reducers/examinations';
import {watchAuth} from './redux/saga/index';
import thunk from 'redux-thunk';
import axios from 'axios';


import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'http://localhost:3001';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = CreateSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    students: studentReducer,
    examinations: examinationReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
