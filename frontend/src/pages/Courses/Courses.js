import React, {Component} from 'react';
import {connect} from 'react-redux';
import Course from './Course/Course';
import AddButton from '../../components/UI/AddButton/AddButton';
import AddIcon from '../../theme/svg/add.svg'
import * as actions from '../../redux/actions/index';
import classes from './Courses.css';

class Courses extends Component {
    componentDidMount() {
        this.props.onFetchCourses();
    }

    addModuleClassHandler = () => {
        this.props.history.push('/courses/module-classes/add-module-class');
    } 

    render() {
        const listCourses = this.props.courses.map(course => {
            return <Course key={course.uuid} uuid={course.uuid} courseName={course.course_name} listModuleClasses={course.module_classes}/>
        })
        return (
            <div className={classes.Container}>
                <AddButton classButton='AddButton' icon={AddIcon} clicked={this.addModuleClassHandler}>Thêm lớp học phần</AddButton>
                <div className={classes.Courses}>
                    {listCourses}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses.courses,
        error: state.courses.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchCourses: () => dispatch(actions.fetchCourses())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);