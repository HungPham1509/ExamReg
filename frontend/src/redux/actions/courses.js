import * as actionTypes from './actionTypes';

export const fetchCoursesStart = () => {
    return {
        type: actionTypes.FETCH_COURSES_START
    }
}

export const fetchCoursesFail = (error) => {
    return {
        type: actionTypes.FETCH_COURSES_FAIL,
        error: error
    }
}

export const fetchCoursesSuccess = (courses) => {
    return {
        type: actionTypes.FETCH_COURSES_SUCCESS,
        courses: courses
    }
}

export const fetchCourses = (page) => {
    return {
        type: actionTypes.FETCH_COURSES,
        page: page
    }
}

export const fetchCourseDetailsStart = () => {
    return {
        type: actionTypes.FETCH_COURSE_DETAILS_START
    }
}

export const fetchCourseDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_COURSE_DETAILS_FAIL,
        error: error
    }
}

export const fetchCourseDetailsSuccess = (courseDetails) => {
    return {
        type: actionTypes.FETCH_COURSE_DETAILS_SUCCESS,
        courseDetails: courseDetails
    }
}

export const fetchCourseDetails = (courseUuid) => {
    return {
        type: actionTypes.FETCH_COURSE_DETAILS,
        courseUuid: courseUuid
    }
}

export const fetchModuleClassDetailsStart = () => {
    return {
        type: actionTypes.FETCH_MODULE_CLASS_START
    }
}

export const fetchModuleClassDetailsSuccess = (moduleClass) => {
    return {
        type: actionTypes.FETCH_MODULE_CLASS_SUCCESS,
        moduleClassDetails: moduleClass
    }
}

export const fetchModuleClassDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_MODULE_CLASS_FAIL,
        error: error
    }
}

export const fetchModuleClassDetails = (moduleClassUuid) => {
    return {
        type: actionTypes.FETCH_MODULE_CLASS,
        moduleClassUuid: moduleClassUuid
    }
}

export const addModuleClassStart = () => {
    return {
        type: actionTypes.ADD_MODULE_CLASS_START
    }
}

export const addModuleClassSuccess = (message) => {
    return {
        type: actionTypes.ADD_MODULE_CLASS_SUCCESS,
        message: message
    }
}

export const addModuleClassFail = (error) => {
    return {
        type: actionTypes.ADD_MODULE_CLASS_FAIL,
        error: error
    }
}

export const addModuleClass = (file) => {
    return {
        type: actionTypes.ADD_MODULE_CLASS,
        file: file
    }
}