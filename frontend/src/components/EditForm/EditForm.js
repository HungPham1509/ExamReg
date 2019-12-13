import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Modal from '../Modal/Modal';
import * as actions from '../../redux/actions/index';
import classes from './EditForm.css';

class EditForm extends Component {
    state = {
        student: {
            fullname: this.props.formData['fullname'],
            student_code: this.props.formData['student_code'],
            birth_date: this.props.formData['birth_date'],
            class_name: this.props.formData['class_name'],
            class_code: this.props.formData['class_code'],
            vnu_mail: this.props.formData['vnu_mail']
        },
        showModal: false
    }

    inputChangedHandler = (event, info) => {
        const updateStudent = {
            ...this.state.student,
            [info]: event.target.value
        }
        
        this.setState({
            student: updateStudent
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onEditStudent(this.props.id, this.state.student);
        this.setState({
            showModal: true
        })
    }

    render() {
        const temp = [];
        for(let info in this.state.student) {
            temp.push({
                id: info,
                value: this.state.student[info]
            })
        }
        const labels = ['Họ và tên', 'Mã sinh viên', 'Ngày sinh', 'Lớp', 'Khóa', 'VNU mail'];
        let i = -1;
        const form = temp.map(item => {
            i++;
            let tt = (labels[i] === 'VNU mail') ? {textTransform: 'lowercase'} : null
            return (
                <div className={classes.Container} key={item.id}>
                    <label>{labels[i]}</label>
                    <input spellCheck={false} className={classes.Block} value={item.value} onChange={(event) => this.inputChangedHandler(event, item.id)} style={tt} />
                </div>
            )
        })
        let main = (this.props.message) ? <Modal show={this.props.edit} clicked={this.props.clicked}>{this.props.message}</Modal> 
                                        : <div className={classes.formContainer}>
                                            <div className={classes.Title}>Chỉnh sửa thông tin sinh viên</div>
                                            <form className={classes.Form} onSubmit={this.submitFormHandler}>
                                                {form}
                                                <div className={classes.Buttons}>
                                                    <button className={classes.Cancel} onClick={this.props.clicked}>Hủy bỏ</button>
                                                    <button className={classes.Save} type='submit'>Xác nhận</button>
                                                </div>  
                                            </form>
                                        </div>
        return main;
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.students.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditStudent: (id, data) => dispatch(actions.editStudent(id, data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));