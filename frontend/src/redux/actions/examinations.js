import * as actionTypes from './actionTypes';

export const fetchExaminationsStart = () => {
    return {
        type: actionTypes.FETCH_EXAMINATIONS_START
    }
}

export const fetchExaminationsFail = (error) => {
    return {
        type: actionTypes.FETCH_EXAMINATIONS_FAIL,
        error: error
    }
}

export const fetchExaminationsSuccess = (examinations) => {
    return {
        type: actionTypes.FETCH_EXAMINATIONS_SUCCESS,
        examinations: examinations
    }
}

export const fetchExaminations = () => {
    return {
        type: actionTypes.FETCH_EXAMINATIONS
    }
}

export const fetchExaminationDetailsStart = () => {
    return {
        type: actionTypes.FETCH_EXAMINATION_DETAILS_START
    }
}

export const fetchExaminationDetailsSuccess = (examinationDetails) => {
    return {
        type: actionTypes.FETCH_EXAMINATION_DETAILS_SUCCESS,
        examinationDetails: examinationDetails
    }
}

export const fetchExaminationDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_EXAMINATION_DETAILS_FAIL,
        error: error
    }
}

export const fetchExaminationDetails = (examinationUuid, page) => {
    return {
        type: actionTypes.FETCH_EXAMINATION_DETAILS,
        examinationUuid: examinationUuid,
        page: page
    }
}

export const addShiftStart = () => {
    return {
        type: actionTypes.ADD_SHIFT_START
    }
}

export const addShiftSuccess = (message) => {
    return {
        type: actionTypes.ADD_SHIFT_SUCCESS,
        message: message
    }
}

export const addShiftFail = (error) => {
    return {
        type: actionTypes.ADD_SHIFT_FAIL,
        error: error
    }
}

export const addShift = (examinationUuid, formData) => {
    return {
        type: actionTypes.ADD_SHIFT,
        formData: formData,
        examinationUuid: examinationUuid
    }
}
