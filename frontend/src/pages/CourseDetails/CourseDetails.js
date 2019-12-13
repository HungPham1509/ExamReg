import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/index';
import Block from '../../components/Block/Block';
import classes from './CourseDetails.css';

class CourseDocuments extends Component {
    componentDidMount() {
        const uuid = this.props.match.params.course_uuid;
        this.props.onFetchCourseDetails(uuid);
    }
    render() {
        const details = [];
        let mClasses;
        const labels = ['Tên học phần:', 'Mã học phần:', 'Đơn vị quản lý:', 'Hình thức KT:', 'Thời lượng KT:'];
        let i = 0;
        for(let detail in this.props.courseDetails) {
            if(detail !== 'module_classes' && detail !== 'uuid') {
                details.push({
                    id: detail,
                    properties: this.props.courseDetails[detail],
                    label: labels[i]
                })
                i++;
            }
            if(detail === 'module_classes') {
                mClasses = this.props.courseDetails[detail];
            }
        }
        const allDetails = details.map(detail => {
            return <Block key={detail.id} child={detail.properties} label={detail.label}/>
        });

        const moduleClass = mClasses.map(mc => {
            const index = mClasses.indexOf(mc) + 1;
            return (
                <tr key={mc.uuid}>
                    <td>{index}</td>
                    <td>{mc.module_class_code}</td>
                    <td>{mc.number_of_credits}</td>
                    <td>{mc.lecturer_name}</td>
                </tr>
            )
        })

        return (
            <div className={classes.Container}>
                <div className={classes.Information}>
                    {allDetails}
                </div>
                <div className={classes.ModuleClasses}>
                    <div className={classes.Title}>Dang sách lớp học phần</div>
                    <table className={classes.Table}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Lớp học phần</th>
                                <th>Số tín chỉ</th>
                                <th>Giảng viên</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moduleClass}
                        </tbody>
                    </table>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courseDetails: state.courses.courseDetails,
        error: state.courses.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchCourseDetails: (courseUuid) => dispatch(actions.fetchCourseDetails(courseUuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDocuments);