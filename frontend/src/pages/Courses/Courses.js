import React, {Component} from 'react';
import {connect} from 'react-redux';
import Course from './Course/Course';
import AddButton from '../../components/UI/AddButton/AddButton';
import AddIcon from '../../theme/svg/add.svg'
import PageButton from '../../components/UI/PageButton/PageButton';
import * as actions from '../../redux/actions/index';
import classes from './Courses.css';

class Courses extends Component {
    state = {
        page: 0,
        showNext: true,
        showPrevious: false,
    }

    componentDidMount() {
        this.props.history.push({
            pathname: '/courses',
            search: '?page=' + (this.state.page + 1)
        })
        this.props.onFetchCourses(this.state.page);
    }

    nextClickedHandler = () => {
        const tmp = this.state.page + 1;
        if(this.props.courses.length >= 4) {
            this.props.history.push({
                pathname: '/courses',
                search: '?page=' + (tmp + 1)
            })
            this.props.onFetchCourses(tmp)
            this.setState({
                page: tmp,
                showNext: true,
                showPrevious: true
            })
        }
        else {
            this.setState({
                showNext: false
            })
        }
    }

    previousClickedHandler = () => {
        const tmp = this.state.page - 1;
        if(this.state.page > 0) {
            this.props.history.push({
                pathname: '/courses',
                search: '?page=' + (tmp + 1)
            })
            this.props.onFetchCourses(tmp)
            this.setState({
                page: tmp,
                showPrevious: true,
                showNext: true
            })
        }
        else {
            this.setState({
                showPrevious: false
            })
        }
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
                <div className={classes.ButtonsRow}>
                    <PageButton 
                            nextClicked={this.nextClickedHandler} 
                            previousClicked={this.previousClickedHandler}
                            showPrevious={this.state.showPrevious}
                            showNext={this.state.showNext}
                            page={this.state.page + 1}
                            style={classes.PButton}/>
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
        onFetchCourses: (page) => dispatch(actions.fetchCourses(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);