import React, {Component} from 'react';
import {connect} from 'react-redux';
import Block from '../../components/Block/Block';
import * as actions from '../../redux/actions/index';
import classes from './Profile.css';

class Profile extends Component {
    componentDidMount() {
        this.props.onFetchStudentDetails(this.props.userId);
    }

    render() {
        const details = [];
        const labels = ['Họ và tên', 'Ngày sinh', 'Mã sinh viên', 'Lớp', 'Khóa', 'VNU mail'];
        let mClasses;
        let i = 0;
        for(let detail in this.props.studentDetails) {
            if(detail !== 'module_classes' && detail !== 'uuid') {
                details.push({
                    id: detail,
                    properties: this.props.studentDetails[detail],
                    label: labels[i]
                })
                i++;
            }
            if(detail === 'module_classes') {
                mClasses = this.props.studentDetails[detail];
            }
        }

        const allDetails = details.map(detail => {
            return <Block key={detail.id} child={detail.properties} label={detail.label}/>
        });
        
        const moduleClass = mClasses.map(mc => {
            const index = mClasses.indexOf(mc) + 1;
            let note = (mc.condition['status'] === 0) ? 'Cấm thi' : 'Đủ điều kiện thi';
            let colorText = (mc.condition['status'] === 0) ? {color: '#cc2424'} : {color: '#00a651'}
            return (
                <tr key={mc.uuid}>
                    <td style={colorText}>{index}</td>
                    <td style={colorText}>{mc.module_class_code}</td>
                    <td style={colorText}>{mc.number_of_credits}</td>
                    <td style={colorText}>{mc.lecturer_name}</td>
                    <td style={colorText}>{note}</td>
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
                                <th>Ghi chú</th>
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
        userId: state.auth.userId,
        studentDetails: state.students.studentDetails,
        error: state.students.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchStudentDetails: (StudentUuid) => dispatch(actions.fetchStudentDetails(StudentUuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);