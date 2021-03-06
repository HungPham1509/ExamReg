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

export const fetchExaminationDetails = (examinationUuid) => {
    return {
        type: actionTypes.FETCH_EXAMINATION_DETAILS,
        examinationUuid: examinationUuid
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

export const deleteShiftStart = () => {
    return {
        type: actionTypes.DELETE_SHIFT_START
    }
}

export const deleteShiftSuccess = (message) => {
    return {
        type: actionTypes.DELETE_SHIFT_SUCCESS,
        message: message
    }
}

export const deleteShiftFail = (error) => {
    return {
        type: actionTypes.DELETE_SHIFT_FAIL,
        error: error
    }
}

export const deleteShift = (shiftUuid) => {
    return {
        type: actionTypes.DELETE_SHIFT,
        shiftUuid: shiftUuid
    }
}

export const fetchExaminationShiftDetailsStart = () => {
    return {
        type: actionTypes.FETCH_EXAMINATION_SHIFT_DETAILS_START
    }
}

export const fetchExaminationShiftDetailsSuccess = (examinationShiftDetails) => {
    return {
        type: actionTypes.FETCH_EXAMINATION_SHIFT_DETAILS_SUCCESS,
        examinationShiftDetails: examinationShiftDetails
    }
}

export const fetchExaminationShiftDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_EXAMINATION_SHIFT_DETAILS_FAIL,
        error: error
    }
}

export const fetchExaminationShiftDetails = (examinationUuid, shiftUuid) => {
    return {
        type: actionTypes.FETCH_EXAMINATION_SHIFT_DETAILS,
        examinationUuid: examinationUuid,
        shiftUuid: shiftUuid
    }
}

export const addExaminationStart = () => {
    return {
        type: actionTypes.ADD_EXAMINATION_START
    }
}

export const addExaminationSuccess = (message) => {
    return {
        type: actionTypes.ADD_EXAMINATION_SUCCESS,
        message: message
    }
}

export const addExaminationFail = (error) => {
    return {
        type: actionTypes.ADD_EXAMINATION_FAIL,
        error: error
    }
}

export const addExamination = (formData) => {
    return {
        type: actionTypes.ADD_EXAMINATION,
        formData: formData,
    }
}