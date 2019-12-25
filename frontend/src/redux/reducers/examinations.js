import * as actionTypes from '../actions/actionTypes';

const initialState = {
    examinations: [],
    examinationDetails: {
        uuid: null,
        year: null,
        semester: null,
        examination_shifts: []
    },
    error: null,
    message: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_EXAMINATIONS_START:
            return {
                ...state,
                error: null
            }
        case actionTypes.FETCH_EXAMINATIONS_SUCCESS:
            return {
                ...state,
                examinations: action.examinations
            }
        case actionTypes.FETCH_EXAMINATIONS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.FETCH_EXAMINATION_DETAILS_START:
            return {
                ...state,
                error: null,
                examinationDetails: {
                    uuid: null,
                    year: null,
                    semester: null,
                    examination_shifts: []
                }
            }
        case actionTypes.FETCH_EXAMINATION_DETAILS_SUCCESS:
            return {
                ...state,
                examinationDetails: action.examinationDetails
            }
        case actionTypes.FETCH_EXAMINATION_DETAILS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.ADD_SHIFT_START:
            return {
                ...state,
                message: null,
                error: null
            }
        case actionTypes.ADD_SHIFT_SUCCESS:
            return {
                ...state,
                message: action.message
            }
        case actionTypes.ADD_SHIFT_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.DELETE_SHIFT_START:
            return {
                ...state,
                error: null,
                message: null
            }
        case actionTypes.DELETE_SHIFT_SUCCESS:
            return {
                ...state,
                message: action.message
            }
        case actionTypes.DELETE_STUDENT_FAIL: 
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer;