import React, {Component} from 'react';
import AddingInput from '../../../components/UI/AddingInput/AddingInputs';
import {connect} from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import * as actions from '../../../redux/actions/index';
import classes from './AddShiftForm.css';

class AddShiftForm extends Component {
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
        this.props.onAddShift(this.props.examinationID, formData);
    }

    render() {
        return(
            <div className={classes.formContainer}>
                <div className={classes.Title}>Tạo ca thi</div>
                <form className={classes.Form} onSubmit={this.submitFormHandler}>
                
                    <div className={classes.Buttons}>
                        <button className={classes.Cancel} type='button' onClick={this.props.cancelClicked}>Hủy bỏ</button>
                        <button className={classes.Save} type='submit'>Xác nhận</button>
                    </div>  
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.examinations.message,
        error: state.examinations.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddShift: (id, data) => dispatch(actions.addShift(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShiftForm);