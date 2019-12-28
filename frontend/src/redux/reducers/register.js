import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shift: [],
    registeredShifts: [],
    error: null,
    message: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SHIFTS_OF_STUDENT_START:
            return {
                ...state,
                shift: []
            }
        case actionTypes.FETCH_SHIFTS_OF_STUDENT_SUCCESS:
            return {
                ...state,
                shift: action.shift
            }
        case actionTypes.FETCH_SHIFTS_OF_STUDENT_FAIL:
            return {
                ...state,
                error: null
            }
        case actionTypes.REGISTER_SHIFT_START:
            return {
                ...state,
                error: null,
                message: null
            }
        case actionTypes.REGISTER_SHIFT_SUCCESS:
            return {
                ...state,
                message: action.message
            }
        case actionTypes.REGISTER_SHIFT_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.FETCH_REGISTERED_SHIFTS_START:
            return {
                ...state,
                registeredShifts: [],
                error: null
            }
        case actionTypes.FETCH_REGISTERED_SHIFTS_SUCCESS:
            return {
                ...state,
                registeredShifts: action.registeredShifts
            }
        case actionTypes.FETCH_REGISTERED_SHIFTS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.DELETE_REGISTERED_SHIFT_START:
            return {
                ...state,
                error: null,
                message: null
            }
        case actionTypes.DELETE_REGISTERED_SHIFT_SUCCESS:
            return {
                ...state,
                message: action.message
            }
        case actionTypes.DELETE_REGISTERED_SHIFT_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer;