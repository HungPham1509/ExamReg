import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {authUserSaga, logoutSaga, authCheckStateSaga, authCheckTimeOutSaga} from './auth';
import {fetchCoursesSaga, fetchCourseDetailsSaga, fetchModuleClassSaga, addModuleClassSaga} from './courses';
import {fetchStudentsSaga, fetchStudentDetailsSaga, deleteStudentSaga, editStudentSaga, addStudentAccountSaga} from './students';


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authCheckTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
    yield takeEvery(actionTypes.FETCH_COURSES, fetchCoursesSaga);
    yield takeEvery(actionTypes.FETCH_COURSE_DETAILS, fetchCourseDetailsSaga);
    yield takeEvery(actionTypes.FETCH_MODULE_CLASS, fetchModuleClassSaga);
    yield takeEvery(actionTypes.ADD_MODULE_CLASS, addModuleClassSaga);
    yield takeEvery(actionTypes.FETCH_STUDENTS, fetchStudentsSaga);
    yield takeEvery(actionTypes.FETCH_STUDENT_DETAILS, fetchStudentDetailsSaga);
    yield takeEvery(actionTypes.DELETE_STUDENT, deleteStudentSaga);
    yield takeEvery(actionTypes.EDIT_STUDENT, editStudentSaga);
    yield takeEvery(actionTypes.ADD_STUDENT_ACCOUNT, addStudentAccountSaga);
}


