import * as actionTypes from './actionTypes';

export const fetchStudentsStart = () => {
    return {
        type: actionTypes.FETCH_STUDENTS_START
    }
}

export const fetchStudentsFail = (error) => {
    return {
        type: actionTypes.FETCH_STUDENTS_FAIL,
        error: error
    }
}

export const fetchStudentsSuccess = (students) => {
    return {
        type: actionTypes.FETCH_STUDENTS_SUCCESS,
        students: students
    }
}

export const fetchStudents = (page) => {
    return {
        type: actionTypes.FETCH_STUDENTS,
        page: page
    }
}

export const fetchStudentDetailsStart = () => {
    return {
        type: actionTypes.FETCH_STUDENT_DETAILS_START
    }
}

export const fetchStudentDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_STUDENT_DETAILS_FAIL,
        error: error
    }
}

export const fetchStudentDetailsSuccess = (studentDetails) => {
    return {
        type: actionTypes.FETCH_STUDENT_DETAILS_SUCCESS,
        studentDetails: studentDetails
    }
}

export const fetchStudentDetails = (StudentUuid) => {
    return {
        type: actionTypes.FETCH_STUDENT_DETAILS,
        StudentUuid: StudentUuid
    }
}

export const deleteStudentStart = () => {
    return {
        type: actionTypes.DELETE_STUDENT_START
    }
}

export const deleteStudentSuccess = (message) => {
    return {
        type: actionTypes.DELETE_STUDENT_SUCCESS,
        message: message
    }
}

export const deleteStudentFail = (error) => {
    return {
        type: actionTypes.DELETE_STUDENT_FAIL,
        error: error
    }
}

export const deleteStudent = (studentUuid) => {
    return {
        type: actionTypes.DELETE_STUDENT,
        studentUuid: studentUuid
    }
}

export const editStudentStart = () => {
    return {
        type: actionTypes.EDIT_STUDENT_START
    }
}

export const editStudentSuccess = (message) => {
    return {
        type: actionTypes.EDIT_STUDENT_SUCCESS,
        message: message
    }
}

export const editStudentFail = (error) => {
    return {
        type: actionTypes.EDIT_STUDENT_FAIL,
        error: error
    }
}

export const editStudent = (studentUuid, formData) => {
    return {
        type: actionTypes.EDIT_STUDENT,
        studentUuid: studentUuid,
        formData: formData
    }
}

export const addStudentAccount = () => {
    return {
        type: actionTypes.ADD_STUDENT_ACCOUNT
    }
}

export const addStudentAccountStart = () => {
    return {
        type: actionTypes.ADD_STUDENT_ACCOUNT_START
    }
}

export const addStudentAccountFail = (error) => {
    return {
        type: actionTypes.ADD_STUDENT_ACCOUNT_FAIL,
        error: error
    }
}

export const addStudentAccountSuccess = (message) => {
    return {
        type: actionTypes.ADD_STUDENT_ACCOUNT_SUCCESS,
        message: message
    }
}