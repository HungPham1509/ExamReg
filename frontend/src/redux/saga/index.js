import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {authUserSaga, logoutSaga, authCheckStateSaga, authCheckTimeOutSaga} from './auth';
import {fetchCoursesSaga, fetchCourseDetailsSaga, fetchModuleClassSaga, addModuleClassSaga} from './courses';
import {fetchStudentsSaga, fetchStudentDetailsSaga, deleteStudentSaga, editStudentSaga, addStudentAccountSaga} from './students';
import {fetchExaminationsSaga, fetchExaminationDetailsSaga, addShiftSaga, deleteShiftSaga, fetchExaminationShiftDetailsSaga, addExSaga} from './examinations';
import {fetchShiftsOfStudentSaga, registerShiftSaga, fectchRegisteredShiftsSaga, deleteRegisteredShiftSaga} from './register';

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
    yield takeEvery(actionTypes.FETCH_EXAMINATIONS, fetchExaminationsSaga);
    yield takeEvery(actionTypes.FETCH_EXAMINATION_DETAILS, fetchExaminationDetailsSaga);
    yield takeEvery(actionTypes.ADD_SHIFT, addShiftSaga);
    yield takeEvery(actionTypes.DELETE_SHIFT, deleteShiftSaga);
    yield takeEvery(actionTypes.FETCH_SHIFTS_OF_STUDENT, fetchShiftsOfStudentSaga);
    yield takeEvery(actionTypes.REGISTER_SHIFT, registerShiftSaga);
    yield takeEvery(actionTypes.FETCH_REGISTERED_SHIFTS, fectchRegisteredShiftsSaga);
    yield takeEvery(actionTypes.DELETE_REGISTERED_SHIFT, deleteRegisteredShiftSaga);
    yield takeEvery(actionTypes.FETCH_EXAMINATION_SHIFT_DETAILS, fetchExaminationShiftDetailsSaga);
    yield takeEvery(actionTypes.ADD_EXAMINATION, addExSaga);
}


