import React, {Component} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {connect} from 'react-redux';
import EyeIcon from '../../theme/svg/star.svg';
import PrintIcon from '../../theme/svg/printer.svg';
import DeleteIcon from '../../theme/svg/wrong.svg';
import Modal from '../../components/Modal/Modal';
import BackDrop from '../../components/UI/BackDrop/BackDrop';
import Print from '../Print/Print';
import * as actions from '../../redux/actions/index';

import classes from './RegisterShift.css';

class RegisterShift extends Component {
    state = {
        shiftId: null,
        register: false,
        delete: false,
        showModal: false,
        print: false
    }

    componentDidMount() {
        this.props.onFetchStudentDetails(this.props.userId);
        const courses = [];
        const temp = this.props.studentDetails['module_classes'];
        for(var i = 0; i < temp.length; i++) {
            if(temp[i]['condition'].status === 1) {
                courses.push(temp[i].courseUuid);
            }
        }
        const exUuid = this.props.match.params.examination_semester_uuid;
        this.props.onFetchShifts(courses, exUuid);
        this.props.onFetchExaminationDetails(exUuid);
        this.props.onFetchRegisteredShifts(this.props.userId, exUuid);
    }

    confirmRegisterHandler = (event) => {
        event.preventDefault();
        const exUuid = this.props.match.params.examination_semester_uuid;
        const stUuid = this.props.match.params.student_uuid;
        this.props.onRegisterShift(stUuid, exUuid, this.state.shiftId);
        this.setState({
            showModal: true,
            register: false
        })
    }

    confirmDeleteHandler = (event) => {
        event.preventDefault();
        const exUuid = this.props.match.params.examination_semester_uuid;
        const stUuid = this.props.match.params.student_uuid;
        this.props.onDeleteRegisteredShift(stUuid, exUuid, this.state.shiftId);
        this.setState({
            showModal: true,
            delete: false
        })
    }

    printClickedHandler = () => {
        this.setState({
            print: true
        });
        const path = this.props.location.pathname;
        this.props.history.push({
            pathname: path,
            search: '/print-result'
        })
    }

    registerClickedHandler = (id) => {
        this.setState({
            register: true,
            shiftId: id
        })
        const path = this.props.location.pathname;
        this.props.history.push({
            pathname: path,
            search: '?shiftID=' + id + '/register'
        })
    }

    deleteClickedHandler = (id) => {
        this.setState({
            delete: true,
            shiftId: id
        })
        const path = this.props.location.pathname;
        this.props.history.push({
            pathname: path,
            search: '?shiftID=' + id + '/delete'
        })
    }
    confirmPrintClicked = () => {
        const input = document.getElementById('print');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("download.pdf");
        })
        this.setState({
            print: false
        })
        this.props.history.goBack();
    }

    cancelClickedHandler = () => {
        this.setState({
            register: false,
            delete: false,
            print: false,
            shiftId: null
        })
        this.props.history.goBack()
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
        this.componentDidMount();
        this.props.history.goBack()
    }

    render() {  
        let temp = this.props.shift;
        const shifts = [];
        for(var i = 0; i < temp.length ; i++) {
            for(var j = 0 ; j < temp[i].length ; j++) {
                shifts.push(temp[i][j]);
            }
        }
        
        let bd = (this.state.register || this.state.delete || this.state.print) ? <BackDrop clicked={this.cancelClickedHandler} show={this.state.register || this.state.delete || this.state.print}/> : null

        const shiftList = shifts.map(shift => {
            const tempList = this.props.registeredShifts;
            let canReg = true;
            if(tempList.length > 0) {
                for(var i = 0; i < tempList.length; i++) {
                    if(
                        shift['courses'][0].uuid === tempList[i]['courses'][0].uuid ||
                        shift['examination_rooms'][0].status.number_of_computers_remaining <= 0 ||
                        (shift.examination_date === tempList[i].examination_date && shift.start_time >= tempList[i].start_time && shift.end_time <= tempList[i].end_time) ||
                        (shift.examination_date === tempList[i].examination_date && shift.start_time <= tempList[i].start_time && shift.end_time >= tempList[i].end_time) ||
                        (shift.examination_date === tempList[i].examination_date && shift.start_time <= tempList[i].end_time && shift.end_time >= tempList[i].end_time) ||
                        (shift.examination_date === tempList[i].examination_date && shift.start_time >= tempList[i].start_time && shift.start_time <= tempList[i].end_time)
                    ) {
                        canReg = false
                    }
                }
            }
            let malnipulate = (canReg) ? <div className={classes.Manipulate}>
                                            <button className={classes.View} onClick={() => this.registerClickedHandler(shift.uuid)}><img src={EyeIcon} alt='icon'/></button>
                                         </div>
                                       : null
            return(
                <tr key={shift.uuid}>
                    <td>{shift['courses'][0].course_name}</td>
                    <td style={{textAlign: 'center'}}>{shift.examination_date}</td>
                    <td style={{textAlign: 'center'}}>{shift['examination_rooms'][0].room_name}-{shift['examination_rooms'][0].place}</td>
                    <td style={{textAlign: 'center'}}>{shift.start_time}</td>
                    <td style={{textAlign: 'center'}}>{shift.end_time}</td>
                    <td style={{textAlign: 'center'}}>{shift['examination_rooms'][0].number_of_computers}</td>
                    <td style={{textAlign: 'center'}}>{shift['examination_rooms'][0].status.number_of_computers_remaining}</td>
                    <td>
                        {malnipulate}
                    </td>
                </tr>
            )
        })

        const registeredShiftList = this.props.registeredShifts.map(shift => {
            return(
                <tr key={shift.uuid}>
                    <td>{shift['courses'][0].course_name}</td>
                    <td style={{textAlign: 'center'}}>{shift.examination_date}</td>
                    <td style={{textAlign: 'center'}}>{shift['examination_rooms'][0].room_name}-{shift['examination_rooms'][0].place}</td>
                    <td style={{textAlign: 'center'}}>{shift.start_time}</td>
                    <td style={{textAlign: 'center'}}>{shift.end_time}</td>
                    <td>
                        <div className={classes.Manipulate}>
                            <button className={classes.Delete} onClick={() => this.deleteClickedHandler(shift.uuid)}><img width='10px' src={DeleteIcon} alt='icon'/></button>
                        </div>
                    </td>
                </tr>
            )
        })

        let printer = (this.state.print) ? <Print clicked={this.cancelClickedHandler} printed={this.confirmPrintClicked} shifts={this.props.registeredShifts}/> : null;

        let registerConfirm = null;
        if(this.state.register) {
            registerConfirm = (
                <div className={classes.formContainer2}>
                    <div className={classes.AddTitle}>Đăng kí ca thi</div>
                    <form className={classes.Form} onSubmit={this.confirmRegisterHandler}>
                        <div className={classes.Ques}>Bạn chắc chắn muốn đăng kí ca thi này ?</div>
                        <div className={classes.Buttons}>
                            <button className={classes.Cancel} onClick={this.cancelClickedHandler}>Hủy bỏ</button>
                            <button className={classes.Save} type='submit'>Xác nhận</button>
                        </div>  
                    </form>
                </div>
            )
        }

        let deleteConfirm = null;
        if(this.state.delete) {
            deleteConfirm = (
                <div className={classes.formContainer2}>
                    <div className={classes.AddTitle}>Hủy ca thi</div>
                    <form className={classes.Form} onSubmit={this.confirmDeleteHandler}>
                        <div className={classes.Ques}>Bạn chắc chắn muốn hủy ca thi này ?</div>
                        <div className={classes.Buttons}>
                            <button className={classes.Cancel} onClick={this.cancelClickedHandler}>Hủy bỏ</button>
                            <button className={classes.Save} type='submit'>Xác nhận</button>
                        </div>  
                    </form>
                </div>
            )
        }

        let message = null;
        if(this.props.message) {
            message = this.props.message
        }
        if(this.props.error2) {
            message = this.props.error2
        }
        
        return  (
            <div className={classes.Container}>
                <div className={classes.Title}>Kì thi học kì {this.props.examinationDetails.semester} năm học {this.props.examinationDetails.year}</div>
                <div className={classes.ShiftList}>
                <div className={classes.Title2}>Chọn ca thi</div>
                    <div className={classes.Scroll}>
                        <table className={classes.Table}>
                            <thead>
                                <tr>
                                    <th style={{width: '220px', textAlign: 'center'}}>Môn thi</th>
                                    <th style={{width: '120px', textAlign: 'center'}}>Ngày thi</th>
                                    <th style={{width: '120px', textAlign: 'center'}}>Phòng thi</th>
                                    <th style={{textAlign: 'center'}}>Thời gian bắt đầu</th>
                                    <th style={{textAlign: 'center'}}>Thời gian kết thúc</th>
                                    <th style={{width: '90px', textAlign: 'center'}}>máy tính</th>
                                    <th style={{width: '120px', textAlign: 'center'}}>máy tính còn lại</th>
                                    <th style={{width: '80px', textAlign: 'center'}}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shiftList}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.ShiftList}>
                <div className={classes.Title2}>Ca thi đã đăng kí</div>
                    <div className={classes.Scroll2}>
                        <table className={classes.Table}>
                            <thead>
                                <tr>
                                    <th style={{width: '220px', textAlign: 'center'}}>Môn thi</th>
                                    <th style={{width: '120px', textAlign: 'center'}}>Ngày thi</th>
                                    <th style={{width: '120px', textAlign: 'center'}}>Phòng thi</th>
                                    <th style={{textAlign: 'center'}}>Thời gian bắt đầu</th>
                                    <th style={{textAlign: 'center'}}>Thời gian kết thúc</th>
                                    <th style={{width: '80px', textAlign: 'center'}}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registeredShiftList}
                            </tbody>
                        </table>
                    </div>
                    <button className={classes.Print} onClick={this.printClickedHandler}>
                        <p>In kết quả</p>
                        <img src={PrintIcon} alt='icon' />
                    </button>
                </div>
                {bd}
                {printer}
                {registerConfirm}
                {deleteConfirm}
                <Modal show={this.state.showModal} clicked={this.closeModalHandler}>{message}</Modal>
            </div>
        )      
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        studentDetails: state.students.studentDetails,
        error: state.students.error,
        shift: state.register.shift,
        examinationDetails: state.examinations.examinationDetails,
        message: state.register.message,
        error2: state.register.error,
        registeredShifts: state.register.registeredShifts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchStudentDetails: (StudentUuid) => dispatch(actions.fetchStudentDetails(StudentUuid)),
        onFetchShifts: (courses, examinationUuid) => dispatch(actions.fetchShiftsOfStudent(courses, examinationUuid)),
        onFetchExaminationDetails: (examinationUuid) => dispatch(actions.fetchExaminationDetails(examinationUuid)),
        onRegisterShift: (studentUuid, examinationUuid, shiftUuid) => dispatch(actions.registerShift(studentUuid, examinationUuid, shiftUuid)),
        onFetchRegisteredShifts: (studentUuid, examinationUuid) => dispatch(actions.fetchRegisteredShifts(studentUuid, examinationUuid)),
        onDeleteRegisteredShift: (studentUuid, examinationUuid, shiftUuid) => dispatch(actions.deleteRegisteredShift(studentUuid, examinationUuid, shiftUuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterShift);