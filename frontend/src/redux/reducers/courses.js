import * as actionTypes from '../actions/actionTypes';

const initialState = {
    courses: [],
    courseDetails: {
        uuid: null,
        course_name: null,
        course_code: null,
        institute: null,
        examine_method: null,
        examine_time: null,
        module_classes: []
    },
    moduleClassDetails: {
        uuid: null,
        module_class_code: null,
        number_of_credits: null,
        lecturer_name: null,
        students: []
    },
    error: null,
    message: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_COURSES_START:
            return {
                ...state,
                error: null
            }
        case actionTypes.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                error: null,
                courses: action.courses
            }
        case actionTypes.FETCH_COURSES_FAIL: 
            return {
                ...state,
                error: action.error
            }
        case actionTypes.FETCH_COURSE_DETAILS_START:
            return {
                ...state,
                courseDetails: {
                    uuid: null,
                    course_name: null,
                    course_code: null,
                    institute: null,
                    examine_method: null,
                    examine_time: null,
                    module_classes: []
                },
                error: null
            }
        case actionTypes.FETCH_COURSE_DETAILS_SUCCESS:
            return {
                ...state,
                error: null,
                courseDetails: action.courseDetails
            }
        case actionTypes.FETCH_COURSE_DETAILS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.FETCH_MODULE_CLASS_START:
            return {
                ...state,
                error: null,
                moduleClassDetails: {
                    uuid: null,
                    module_class_code: null,
                    number_of_credits: null,
                    lecturer_name: null,
                    students: []
                }
            }
        case actionTypes.FETCH_MODULE_CLASS_SUCCESS: 
            return {
                ...state,
                error: null,
                moduleClassDetails: action.moduleClassDetails
            }
        case actionTypes.FETCH_MODULE_CLASS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.ADD_MODULE_CLASS_START:
            return {
                ...state,
                message: null,
                error: null
            }
        case actionTypes.ADD_MODULE_CLASS_SUCCESS:
            return {
                ...state,
                message: action.message,
                error: null
            }
        case actionTypes.ADD_MODULE_CLASS_FAIL:
            return {
                ...state,
                error: action.error,
                message: null
            }
        default:
            return state;
    }
}

export default reducer;