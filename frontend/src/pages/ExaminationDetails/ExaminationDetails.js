import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddButton from '../../components/UI/AddButton/AddButton';
import AddIcon from '../../theme/svg/add.svg';
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
        showModal: false
    }

    componentDidMount() {
        const path = this.props.location.pathname;
        this.props.history.push({
            pathname: path,
            search: '?page=' + (this.state.page + 1)
        })
        const id = this.props.match.params.examination_semester_uuid;
        this.props.onFetchExaminationDetails(id, this.state.page);
        this.props.onFetchCourses();
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
        this.props.onFetchExaminationDetails(id, this.state.page);
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
            search: '?page=' + (this.state.page + 1) + '/add-examination-shift'
        })
    }

    cancelClickedHandler = () => {
        this.setState({
            add: false
        })
        this.props.history.goBack()
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
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
        let bd = (this.state.add) ? <BackDrop clicked={this.cancelClickedHandler} show={this.state.add}/> : null
        let addForm = (this.state.add) ?    <div className={classes.formContainer}>
                                                <div className={classes.FormTitle}>Tạo ca thi</div>
                                                <form className={classes.Form} onSubmit={this.submitFormHandler}>
                                                    {form}
                                                    <div className={classes.Buttons}>
                                                        <button className={classes.Cancel} type='button' onClick={this.cancelClickedHandler}>Hủy bỏ</button>
                                                        <button className={classes.Save} type='submit'>Xác nhận</button>
                                                    </div>  
                                                </form>
                                            </div> 
                                    : null

        
        return (
            <div className={classes.Container}>
                <div className={classes.Title}>Kì thi học kì {this.props.examinationDetails.semester} năm học {this.props.examinationDetails.year}</div>
                <div className={classes.ShiftList}>
                    <AddButton classButton='AddShift' icon={AddIcon} clicked={this.addShiftHandler}>
                        <p>Tạo ca thi</p>
                    </AddButton>
                </div>
                <Modal show={this.state.showModal} clicked={this.closeModalHandler}>{message}</Modal>
                {addForm}
                {bd}
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
        onFetchExaminationDetails: (examinationUuid, page) => dispatch(actions.fetchExaminationDetails(examinationUuid, page)),
        onFetchCourses: () => dispatch(actions.fetchCourses()),
        onAddShift: (id, data) => dispatch(actions.addShift(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationDetails);