import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

export function* fetchStudentsSaga(action) {
    yield put(actions.fetchStudentsStart());
    try {
        let temp = null;
        yield axios.get('/students?page=' + action.page)
        .then(response => {
            temp = response.data.result;
        })
        yield put(actions.fetchStudentsSuccess(temp));
    } catch (error) {
        yield put(actions.fetchStudentsFail(error));
    }
}

export function* fetchStudentDetailsSaga(action) {
    yield put(actions.fetchStudentDetailsStart());
    try {
        let temp = null;
        yield axios.get('/students/' + action.StudentUuid)
        .then(response => {
            temp = response.data.result
        })
        yield put(actions.fetchStudentDetailsSuccess(temp));
    } catch (error) {
        yield put(actions.fetchStudentDetailsFail(error));
    }
}

export function* deleteStudentSaga (action) {
    yield put(actions.deleteStudentStart());
    try {
        let temp = null;
        yield axios.delete('/students/' + action.studentUuid)
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.deleteStudentSuccess(temp));
    } catch (error) {
        yield put(actions.deleteStudentFail(error));
    }
}

export function* editStudentSaga (action) {
    yield put(actions.editStudentStart());
    try {
        const formData = action.formData;
        let temp = null;
        yield axios.patch('/students/' + action.studentUuid, formData)
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.editStudentSuccess(temp));
    } catch (error) {
        yield put(actions.editStudentFail(error));
    }
}

export function* addStudentAccountSaga() {
    yield put(actions.addStudentAccountStart());
    try {
        let temp = null;
        yield axios.post('/students/add-student-accounts')
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.addStudentAccountSuccess(temp))
    } catch (error) {
        yield put(actions.addStudentAccountFail(error))
    }
}