import * as actionTypes from '../actions/actionTypes';

const initialState = {
    students: [],
    studentDetails: {
        uuid: null,
        fullname: null,
        student_code: null,
        class_name: null,
        class_code: null,
        birth_date: null,
        vnu_mail: null,
        module_classes: []
    },
    error: null,
    message: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_STUDENTS_START:
            return {
                ...state,
                error: null
            }
        case actionTypes.FETCH_STUDENTS_SUCCESS:
            return {
                ...state,
                students: action.students,
                error: null
            }
        case actionTypes.FETCH_STUDENTS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.FETCH_STUDENT_DETAILS_START:
            return {
                ...state,
                studentDetails: {
                    uuid: null,
                    fullname: null,
                    student_code: null,
                    class_name: null,
                    class_code: null,
                    birth_date: null,
                    vnu_mail: null,
                    module_classes: []
                },
                error: null
            }
        case actionTypes.FETCH_STUDENT_DETAILS_SUCCESS:
            return {
                ...state,
                studentDetails: action.studentDetails,
                error: null
            }
        case actionTypes.FETCH_STUDENT_DETAILS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.DELETE_STUDENT_START:
            return {
                ...state,
                error: null,
                message: null
            }
        case actionTypes.DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                error: null,
                message: action.message
            }
        case actionTypes.EDIT_STUDENT_START:
            return {
                ...state,
                error: null,
                message: null
            }
        case actionTypes.EDIT_STUDENT_SUCCESS:
            return {
                ...state,
                error: null,
                message: action.message
            }
        case actionTypes.DELETE_STUDENT_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.ADD_STUDENT_ACCOUNT_START:
            return {
                ...state,
                error: null,
                message: null
            }
        case actionTypes.ADD_STUDENT_ACCOUNT_SUCCESS:
            return {
                ...state,
                message: action.message
            }
        case actionTypes.ADD_STUDENT_ACCOUNT_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;