import * as actionTypes from './actionTypes';

export const fetchShiftsOfStudentStart = () => {
    return {
        type: actionTypes.FETCH_SHIFTS_OF_STUDENT_START
    }
}

export const fetchShiftsOfStudentSuccess = (shift) => {
    return {
        type: actionTypes.FETCH_SHIFTS_OF_STUDENT_SUCCESS,
        shift: shift
    }
}

export const fetchShiftsOfStudentFail = (error) => {
    return {
        type: actionTypes.FETCH_SHIFTS_OF_STUDENT_FAIL,
        error: error
    }
}

export const fetchShiftsOfStudent = (courses, examinationUuid) => {
    return {
        type: actionTypes.FETCH_SHIFTS_OF_STUDENT,
        courses: courses,
        examinationUuid: examinationUuid
    }
}

export const registerShiftStart = () => {
    return {
        type: actionTypes.REGISTER_SHIFT_START
    }
}

export const registerShiftSuccess = (message) => {
    return {
        type: actionTypes.REGISTER_SHIFT_SUCCESS,
        message: message
    }
}

export const registerShiftFail = (error) => {
    return {
        type: actionTypes.REGISTER_SHIFT_FAIL,
        error: error
    }
}

export const registerShift = (studentUuid, examinationUuid, shiftUuid) => {
    return {
        type: actionTypes.REGISTER_SHIFT,
        studentUuid: studentUuid,
        examinationUuid: examinationUuid,
        shiftUuid: shiftUuid
    }
}

export const fetchRegisteredShiftsStart = () => {
    return {
        type: actionTypes.FETCH_REGISTERED_SHIFTS_START
    }
}

export const fetchRegisteredShiftsSuccess = (registeredShifts) => {
    return {
        type: actionTypes.FETCH_REGISTERED_SHIFTS_SUCCESS,
        registeredShifts: registeredShifts
    }
}

export const fetchRegisteredShiftsFail = (error) => {
    return {
        type: actionTypes.FETCH_REGISTERED_SHIFTS_FAIL,
        error: error
    }
}

export const fetchRegisteredShifts = (studentUuid, examinationUuid) => {
    return {
        type: actionTypes.FETCH_REGISTERED_SHIFTS,
        studentUuid: studentUuid,
        examinationUuid: examinationUuid
    }
}

export const deleteRegisteredShiftStart = () => {
    return {
        type: actionTypes.DELETE_REGISTERED_SHIFT_START
    }
}

export const deleteRegisteredShiftSuccess = (message) => {
    return {
        type: actionTypes.DELETE_REGISTERED_SHIFT_SUCCESS,
        message: message
    }
}

export const deleteRegisteredShiftFail = (error) => {
    return {
        type: actionTypes.DELETE_REGISTERED_SHIFT_FAIL,
        error: error
    }
}

export const deleteRegisteredShift = (studentUuid, examinationUuid, shiftUuid) => {
    return {
        type: actionTypes.DELETE_REGISTERED_SHIFT,
        studentUuid: studentUuid,
        examinationUuid: examinationUuid,
        shiftUuid: shiftUuid
    }
}