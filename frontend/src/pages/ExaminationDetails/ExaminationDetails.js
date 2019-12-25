import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddButton from '../../components/UI/AddButton/AddButton';
import AddIcon from '../../theme/svg/add.svg';
import EyeIcon from '../../theme/svg/eye.svg';
import DeleteIcon from '../../theme/svg/wrong.svg';
import AddingInput from '../../components/UI/AddingInput/AddingInputs';
import Modal from '../../components/Modal/Modal';
import BackDrop from '../../components/UI/BackDrop/BackDrop';
import * as actions from '../../redux/actions/index';
import classes from './ExaminationDetails.css';

class ExaminationDetails extends Component {
    state = {
        elements: {
            course: {
                elementType: 'select',
                config: {
                    options: this.props.courses
                },
                value: '',
                label: 'Học phần'
            },
            examination_date: {
                elementType: 'input',
                config: {
                    type: 'date'
                },
                value: '',
                label: 'Ngày thi'
            },
            start_time: {
                elementType: 'input',
                config: {
                    type: 'time'
                },
                value: '',
                label: 'Giờ bắt đầu'
            },
            end_time: {
                elementType: 'input',
                config: {
                    type: 'time'
                },
                value: '',
                label: 'Giờ kết thúc'
            },
            room_name: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Phòng thi'
            },
            place: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Địa điểm'
            }
        },
        page: 0,
        add: false,
        delete: false,
        shiftIdDeleting: null,
        showModal: false
    }

    componentDidMount() {
        const id = this.props.match.params.examination_semester_uuid;
        this.props.onFetchExaminationDetails(id);
        this.props.onFetchCourses(100);
    }

    inputChangedHandler = (event, element) => {
        const updatedElements = {
            ...this.state.elements,
            [element]: {
                ...this.state.elements[element],
                value: event.target.value,
            }
        }
        this.setState({
            elements: updatedElements
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        const formData = {
            course_uuid: this.state.elements['course'].value,
            examination_date: this.state.elements['examination_date'].value,
            start_time: this.state.elements['start_time'].value,
            end_time: this.state.elements['end_time'].value,
            room_name: this.state.elements['room_name'].value,
            place: this.state.elements['place'].value
        }
        const id = this.props.match.params.examination_semester_uuid;
        this.props.onAddShift(id, formData);
        this.setState({
            showModal: true,
            add: false
        })
    }

    addShiftHandler = () => {
        const updatedElements = {
            ...this.state.elements,
        }
        updatedElements['course'].config.options = this.props.courses;
        this.setState({
            add: true,
            elements: updatedElements
        })
        const path = this.props.location.pathname;
        this.props.history.push({
            pathname: path,
            search: '/add-examination-shift'
        })
    }

    deleteClickedHandler = (shiftId) => {
        this.setState({
            delete: true,
            shiftIdDeleting: shiftId
        })
        const path = this.props.location.pathname;
        this.props.history.push({
            pathname: path,
            search: '/shiftID=' + shiftId +'/delete'
        })
    }


    cancelClickedHandler = () => {
        this.setState({
            add: false,
            delete: false
        })
        this.props.history.goBack()
    }

    confirmDeleteHandler = (event) => {
        event.preventDefault();
        this.props.onDeleteShift(this.state.shiftIdDeleting);
        this.setState({
            showModal: true,
            delete: false
        })
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
        const id = this.props.match.params.examination_semester_uuid;
        this.props.onFetchExaminationDetails(id);
        this.props.history.goBack()
    }

    render() {
        let message = null;
        if(this.props.message) {
            message = this.props.message
        }
        if(this.props.error) {
            message = this.props.error
        }
        const addingForm = [];
        for(let element in this.state.elements) {
            addingForm.push({
                id: element,
                properties: this.state.elements[element]
            });
        }

        let form = addingForm.map(element => {
            return <AddingInput 
                        key={element.id}
                        type={element.properties.elementType}
                        config={element.properties.config}
                        label={element.properties.label}
                        value={element.properties.value}
                        changed={(event) => this.inputChangedHandler(event, element.id)}/>
        })
        let bd = (this.state.add || this.state.delete) ? <BackDrop clicked={this.cancelClickedHandler} show={this.state.add || this.state.delete}/> : null
        let addForm = (this.state.add) ? <div className={classes.formContainer}>
                                            <div className={classes.FormTitle}>Tạo ca thi</div>
                                            <form className={classes.Form} onSubmit={this.submitFormHandler}>
                                                {form}
                                                <div className={classes.Buttons}>
                                                    <button className={classes.Cancel} type='button' onClick={this.cancelClickedHandler}>Hủy bỏ</button>
                                                    <button className={classes.Save} type='submit'>Xác nhận</button>
                                                </div>  
                                            </form>
                                          </div> : null

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
        
        const shiftList = this.props.examinationDetails['examination_shifts'].map(shift => {
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
                        <div className={classes.Manipulate}>
                            <button className={classes.View} onClick={this.viewClickedHandler}><img src={EyeIcon} alt='icon'/></button>
                            <button className={classes.Delete} onClick={() => this.deleteClickedHandler(shift.uuid)}><img width='10px' src={DeleteIcon} alt='icon'/></button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <div className={classes.Container}>
                <div className={classes.Title}>Kì thi học kì {this.props.examinationDetails.semester} năm học {this.props.examinationDetails.year}</div>
                <div className={classes.ShiftList}>
                    <AddButton classButton='AddShift' icon={AddIcon} clicked={this.addShiftHandler}>
                        <p>Tạo ca thi</p>
                    </AddButton>
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
                <Modal show={this.state.showModal} clicked={this.closeModalHandler}>{message}</Modal>
                {addForm}
                {bd}
                {deleteConfirm}
            </div>
        )       
    }
}

const mapStateToProps = (state) => {
    return {
        examinationDetails: state.examinations.examinationDetails,
        error: state.examinations.error,
        courses: state.courses.courses,
        message: state.examinations.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchExaminationDetails: (examinationUuid) => dispatch(actions.fetchExaminationDetails(examinationUuid)),
        onFetchCourses: (page) => dispatch(actions.fetchCourses(page)),
        onAddShift: (id, data) => dispatch(actions.addShift(id, data)),
        onDeleteShift: (id) => dispatch(actions.deleteShift(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationDetails);