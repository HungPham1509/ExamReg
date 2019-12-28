import {put, delay} from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import * as actions from '../actions/index';

const cookies = new Cookies();

export function* authUserSaga(action) {
    yield put(actions.authStart());
        const authData = {
            username: action.username,
            password: action.password
        }
    try {
        const response = yield axios.post('/login', authData);
        const token = response.data.token;
        const decoded = jwt.decode(token, 'exam-register-web');
        const userId = decoded.uuid;
        const expirationDate = yield new Date().getTime() + 3600000;
        const role = decoded.role;
        const username = decoded.username;

        yield cookies.set('token', token, {path: '/'});
        yield cookies.set('userID', userId, {path: '/'});
        yield cookies.set('expirationDate', expirationDate, {path: '/'});
        yield cookies.set('role', role, {path: '/'});
        yield cookies.set('username', username, {path: '/'});
        yield put(actions.checkAuthTimeOut(expirationDate));
        yield put(actions.authSuccess(token, userId, role, username));
    } catch (error) {
        yield put(actions.authFail(error.response.data.message));
    } 
}

export function* logoutSaga (action) {
    yield cookies.remove('token', { path: '/' });
    yield cookies.remove('userID', { path: '/' });
    yield cookies.remove('expirationDate', {path: '/'})
    yield cookies.remove('role', { path: '/' });
    yield put(actions.logOutSucceed());
}

export function* authCheckTimeOutSaga (action) {
    yield delay(3600000);
    yield put(actions.authLogout());
}

export function* authCheckStateSaga (action) {
    const token = yield cookies.get('token');
    const userId = yield cookies.get('userID');
    const role = yield cookies.get('role');
    const username = yield cookies.get('username')
    if(!token) {
        yield put(actions.authLogout());
    }
    else {
        const expirationDate = yield cookies.get('expirationDate');
        const presentTime = yield new Date().getTime();
        if(expirationDate <= presentTime) {
            yield put(actions.authLogout());
        }
        else {
            yield put(actions.authSuccess(token, userId, role, username));
            yield put(actions.checkAuthTimeOut(expirationDate - presentTime));
        }
    }
}

