import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

export function* fetchShiftsOfStudentSaga(action) {
    yield put(actions.fetchShiftsOfStudentStart());
    try {
        let temp = [];
        for(var i = 0; i < action.courses.length; i++) {
            yield axios.get('/register/' + action.examinationUuid + '/?course_uuid=' + action.courses[i])
            .then(response => {
                temp.push(response.data.result);
            })
        }
        yield put(actions.fetchShiftsOfStudentSuccess(temp));
    } catch (error) {
        yield put(actions.fetchShiftsOfStudentFail(error));
    }
}

export function* registerShiftSaga(action) {
    yield put(actions.registerShiftStart());
    try {
        let temp = null;
        yield axios.post('/register/' + action.studentUuid + '/' + action.examinationUuid + '?examination_shift_uuid=' + action.shiftUuid)
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.registerShiftSuccess(temp));
    } catch (error) {
        yield put(actions.registerShiftFail(error.response.data.message));
    }
}

export function* fectchRegisteredShiftsSaga(action) {
    yield put(actions.fetchRegisteredShiftsStart());
    try {
        let temp;
        yield axios.get('/register/' + action.studentUuid + '/' + action.examinationUuid)
        .then(response => {
            temp = response.data.result['examination_shifts']
        })
        yield put(actions.fetchRegisteredShiftsSuccess(temp))
    } catch (error) {
        yield put(actions.fetchRegisteredShiftsFail(error.response.data.message));
    }
}

export function* deleteRegisteredShiftSaga(action) {
    yield put(actions.deleteRegisteredShiftStart());
    try {
        let temp;
        yield axios.delete('/register/' + action.studentUuid + '/' + action.examinationUuid + '?examination_shift_uuid=' + action.shiftUuid)
        .then(response => {
            temp = response.data.message
        })
        yield put(actions.deleteRegisteredShiftSuccess(temp));
    } catch (error) {
        yield put(actions.deleteRegisteredShiftFail(error.response.data.message))
    }
}