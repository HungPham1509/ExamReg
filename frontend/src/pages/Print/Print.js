import React, {Component} from 'react';
import {connect} from 'react-redux';
import Block from '../../components/Block/Block';
import * as actions from '../../redux/actions/index';
import classes from './Print.css';

class Print extends Component {
    componentDidMount() {
        this.props.onFetchStudentDetails(this.props.userId);
    }
    render() {
        const details = [];
        const labels = ['Họ và tên', 'Ngày sinh', 'Mã sinh viên', 'Lớp', 'Khóa', 'VNU mail'];
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
        }
        const allDetails = details.map(detail => {
            return <Block key={detail.id} child={detail.properties} label={detail.label}/>
        });

        const registeredShiftList = this.props.shifts.map(shift => {
            return(
                <tr key={shift.uuid}>
                    <td>{shift['courses'][0].course_name}</td>
                    <td style={{textAlign: 'center'}}>{shift.examination_date}</td>
                    <td style={{textAlign: 'center'}}>{shift['examination_rooms'][0].room_name}-{shift['examination_rooms'][0].place}</td>
                    <td style={{textAlign: 'center'}}>{shift.start_time}</td>
                    <td style={{textAlign: 'center'}}>{shift.end_time}</td>
                </tr>
            )
        })

        return  <div className={classes.Container}>
                    <div id='print' className={classes.Print}>
                        <div className={classes.Information}>
                            {allDetails}
                        </div>
                        <div className={classes.Title2}>Ca thi đã đăng kí</div>
                        <div className={classes.Scroll2}>
                            <table className={classes.Table}>
                                <thead>
                                    <tr>
                                        <th style={{width: '220px', textAlign: 'center'}}>Môn thi</th>
                                        <th style={{width: '120px', textAlign: 'center'}}>Ngày thi</th>
                                        <th style={{width: '120px', textAlign: 'center'}}>Phòng thi</th>
                                        <th style={{textAlign: 'center'}}>Thời gian bắt đầu</th>
                                        <th style={{textAlign: 'center', borderRight: 'none'}}>Thời gian kết thúc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredShiftList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={classes.Buttons}>
                        <button className={classes.Cancel} onClick={this.props.clicked}>Hủy bỏ</button>
                        <button className={classes.Save} onClick={this.props.printed}>Xác nhận</button>
                    </div>
                </div>       
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


export default connect(mapStateToProps, mapDispatchToProps)(Print);