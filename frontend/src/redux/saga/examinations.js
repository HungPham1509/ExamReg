import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

export function* fetchExaminationsSaga(action) {
    yield put(actions.fetchExaminationsStart());
    try {
        let temp = null;
        yield axios.get('/examinations')
        .then(response => {
            temp = response.data.result
        })
        yield put(actions.fetchExaminationsSuccess(temp));
    } catch (error) {
        yield put(actions.fetchExaminationsFail(error));
    }
}

export function* fetchExaminationDetailsSaga(action) {
    yield put(actions.fetchExaminationDetailsStart());
    try {
        let temp = null;
        yield axios.get('/examinations/' + action.examinationUuid)
        .then(response => {
            temp = response.data.result
        })
        yield put(actions.fetchExaminationDetailsSuccess(temp));
    } catch (error) {
        yield put(actions.fetchExaminationDetailsFail(error));
    }
}

export function* addShiftSaga(action) {
    yield put(actions.addShiftStart());
    try {
        let temp = null;
        yield axios.post('/examinations/' + action.examinationUuid, action.formData)
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.addShiftSuccess(temp));
    } catch (error) {
        yield put(actions.addShiftFail(error.response.data.message));
    }
}

export function* deleteShiftSaga(action) {
    yield put(actions.deleteShiftStart());
    try {
        let temp = null;
        yield axios.delete('/examinations/' + action.shiftUuid)
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.deleteShiftSuccess(temp));
    } catch (error) {
        yield put(actions.deleteStudentFail(error));
    }
}

export function* fetchExaminationShiftDetailsSaga(action) {
    yield put(actions.fetchExaminationShiftDetailsStart());
    try {
        let temp = null;
        yield axios.get('/examinations/' + action.examinationUuid + '/' + action.shiftUuid)
        .then(response => {
            temp = response.data.result
        })
        yield put(actions.fetchExaminationShiftDetailsSuccess(temp))
    } catch (error) {
        yield put(actions.fetchExaminationShiftDetailsFail(error));
    }
}

export function* addExSaga(action) {
    yield put(actions.addExaminationStart());
    try {
        let temp;
        yield axios.post('/examinations', action.formData)
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.addExaminationSuccess(temp))
    } catch (error) {
        yield put(actions.addExaminationFail(error.response.data.message))
    }
}