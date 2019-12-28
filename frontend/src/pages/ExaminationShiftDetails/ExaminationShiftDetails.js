import React, {Component} from 'react';
import {connect} from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrintIcon from '../../theme/svg/printer.svg';
import * as actions from '../../redux/actions/index';
import classes from './ExaminationShiftDetails.css';

class ExaminationShiftDetails extends Component {
    componentDidMount() {
        const exId = this.props.match.params.examination_semester_uuid;
        const shId = this.props.match.params.examination_shift_uuid;
        this.props.onFetchExaminationShiftDetails(exId, shId);
    }

    confirmPrintClicked = () => {
        const input = document.getElementById('shift-info');
        html2canvas(input, {
            windowWidth: 1000,
            windowHeight: 600,
        })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("download2.pdf");
        })
    }

    render() {
        const details = [];
        let courses;
        let rooms;
        let students;
        for(let detail in this.props.examinationShiftDetails) {
            if(detail === 'courses') {
                courses = this.props.examinationShiftDetails[detail]
            }
            else if(detail === 'examination_rooms') {
                rooms = this.props.examinationShiftDetails[detail]
            }
            else if(detail === 'students') {
                students = this.props.examinationShiftDetails[detail]
            }
            else {
                details.push(this.props.examinationShiftDetails[detail])
            }
            
        }
        
        const course = courses.map(c => {
            return <td key={c.uuid}>{c.course_name}</td>
        })
        const room = rooms.map(r => {
            return <td style={{textAlign: 'center'}} key={r.uuid}>{r.room_name}-{r.place}</td>
        })

        const sList = students.map(student => {
            const index = students.indexOf(student);
            const stt = index + 1;
            return (
                <tr key={student.uuid}>
                    <td>{stt}</td>
                    <td>{student.fullname}</td>
                    <td>{student.student_code}</td>
                    <td>{student.birth_date}</td>
                    <td>{student.class_name}</td>
                </tr>
            ) 
        })

        const detailList = (
            <tr>
                {course}
                <td style={{textAlign: 'center'}}>{details[1]}</td>
                {room}
                <td style={{textAlign: 'center'}}>{details[2]}</td>
                <td style={{textAlign: 'center'}}>{details[3]}</td>
            </tr>
        )

        return  <div className={classes.Container}>
                    <div id='shift-info' className={classes.Container2}>
                        <div className={classes.Scroll2}>
                            <table className={classes.Table}>
                                <thead>
                                    <tr>
                                        <th style={{width: '220px', textAlign: 'center'}}>Môn thi</th>
                                        <th style={{width: '120px', textAlign: 'center'}}>Ngày thi</th>
                                        <th style={{width: '120px', textAlign: 'center'}}>Phòng thi</th>
                                        <th style={{textAlign: 'center'}}>Thời gian bắt đầu</th>
                                        <th style={{textAlign: 'center'}}>Thời gian kết thúc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailList}
                                </tbody>
                            </table>
                        </div>
                        <div className={classes.StudentList}>
                        <div className={classes.Title}>Dang sách sinh viên dự thi</div>
                            <table className={classes.Table2}>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Mã sinh viên</th>
                                        <th>Ngày sinh</th>
                                        <th>Lớp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className={classes.Print} onClick={this.confirmPrintClicked}>
                        <p>In kết quả</p>
                        <img src={PrintIcon} alt='icon' />
                    </button>
                </div>
    }
}

const mapStateToProps = (state) => {
    return {
        examinationDetails: state.examinations.examinationDetails,
        examinationShiftDetails: state.examinations.examinationShiftDetails,
        error: state.examinations.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchExaminationDetails: (examinationUuid) => dispatch(actions.fetchExaminationDetails(examinationUuid)),
        onFetchExaminationShiftDetails: (examinationUuid, shiftId) => dispatch(actions.fetchExaminationShiftDetails(examinationUuid, shiftId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationShiftDetails);