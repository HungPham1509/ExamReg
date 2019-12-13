import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';


export function* fetchCoursesSaga() {
    yield put(actions.fetchCoursesStart());
    try {
        let temp = null;
        yield axios.get('/courses').then(response => {
            temp = response.data.result
        })
        yield put(actions.fetchCoursesSuccess(temp));
    } catch (error) {
        yield put(actions.fetchCoursesFail('Có lỗi xảy ra'))
    }
}

export function* fetchCourseDetailsSaga(action) {
    yield put(actions.fetchCourseDetailsStart());
    try {
        let temp = null;
        yield axios.get('/courses/' + action.courseUuid)
        .then(response => {
            temp = response.data.course;
        })
        yield put(actions.fetchCourseDetailsSuccess(temp));
    } catch (error) {
        yield put(actions.fetchCourseDetailsFail(error));
    }
}

export function* fetchModuleClassSaga(action) {
    yield put(actions.fetchModuleClassDetailsStart());
    try {
        let temp = null;
        yield axios.get('/courses/module-classes/' + action.moduleClassUuid)
        .then(response => {
            temp = response.data.result
        })
        yield put(actions.fetchModuleClassDetailsSuccess(temp));
    } catch (error) {
        yield put(actions.fetchModuleClassDetailsFail(error))
    }
}

export function* addModuleClassSaga(action) {
    yield put(actions.addModuleClassStart());
    try {
        let temp = null;
        const formData = new FormData();
        formData.append('moduleClassFile', action.file);
        yield axios.post('/courses/module-classes/add-module-class', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            temp = response.data.message
        })
        yield put(actions.addModuleClassSuccess(temp));
    } catch (error) {
        if(error.response.data.message) {
            yield put(actions.addModuleClassFail(error.response.data.message));
        }
        else {
            yield put(actions.addModuleClassFail('File không đúng định dạng'));
        }
    }
}