import React, {Component} from 'react';
import EyeIcon from '../../theme/svg/eye.svg';
import PencilIcon from '../../theme/svg/pencil-edit-button.svg';
import DeleteIcon from '../../theme/svg/wrong.svg';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import BackDrop from '../UI/BackDrop/BackDrop';
import Modal from '../Modal/Modal';
import * as actions from '../../redux/actions/index';
import classes from './Manipulate.css';

class Manipulate extends Component {
    state = {
        student: {
            fullname: this.props.formData['fullname'],
            student_code: this.props.formData['student_code'],
            birth_date: this.props.formData['birth_date'],
            class_name: this.props.formData['class_name'],
            class_code: this.props.formData['class_code'],
            vnu_mail: this.props.formData['vnu_mail']
        },
        edit: false,
        delete: false,
        showModal: false
    }

    viewClickedHandler = () => {
        this.props.history.push({
            pathname: '/students/studentID=' + this.props.id
        })
    }

    editClickedHandler = () => {
        this.setState({
            edit: true
        })
        this.props.history.push({
            pathname: '/students',
            search: '?page=' + (this.props.page + 1) + '/studentID=' + this.props.id + '/edit',
        })
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
    
    deleteClickedHandler = () => {
        this.setState({
            delete: true
        })
        this.props.history.push({
            pathname: '/students',
            search: '?page=' + (this.props.page + 1) + '/studentID=' + this.props.id + '/delete',
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onEditStudent(this.props.id, this.state.student);
        this.setState({
            showModal: true,
            edit: false
        })
    }

    confirmDeleteHandler = (event) => {
        event.preventDefault();
        this.props.onDeleteStudent(this.props.id)
        this.setState({
            showModal: true,
            delete: false
        })
    }

    cancelClickedHandler = () => {
        this.setState({
            edit: false,
            delete: false
        })
        this.props.history.goBack();
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
        this.props.onFetchStudents(this.props.page);
        this.props.history.goBack()
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

        let deleteConfirm = null;
        if(this.state.delete) {
            deleteConfirm = (
                <div className={classes.formContainer2}>
                    <div className={classes.AddTitle}>Xóa sinh viên</div>
                    <form className={classes.Form} onSubmit={this.confirmDeleteHandler}>
                        <div className={classes.Ques}>Bạn chắc chắn muốn xóa sinh viên này ?</div>
                        <div className={classes.Buttons}>
                            <button className={classes.Cancel} onClick={this.cancelClickedHandler}>Hủy bỏ</button>
                            <button className={classes.Save} type='submit'>Xác nhận</button>
                        </div>  
                    </form>
                </div>
            )
        }

        let bd = (this.state.edit || this.state.delete) ? <BackDrop clicked={this.cancelClickedHandler} show={this.state.edit || this.state.delete}/> : null
        let editForm = null;
        if(this.state.edit) {
            editForm = (
                <div className={classes.formContainer}>
                    <div className={classes.Title}>Chỉnh sửa thông tin sinh viên</div>
                    <form className={classes.Form} onSubmit={this.submitFormHandler}>
                        {form}
                        <div className={classes.Buttons}>
                            <button className={classes.Cancel} onClick={this.cancelClickedHandler}>Hủy bỏ</button>
                            <button className={classes.Save} type='submit'>Xác nhận</button>
                        </div>  
                    </form>
                </div>
            )
        }

        return(
            <div className={classes.Manipulate}>
                {bd}
                {editForm}
                {deleteConfirm}
                <Modal show={this.state.showModal} clicked={this.closeModalHandler}>{this.props.message}</Modal>
                <button className={classes.View} onClick={this.viewClickedHandler}><img src={EyeIcon} alt='icon'/></button>
                <button className={classes.Edit} onClick={this.editClickedHandler}><img src={PencilIcon} alt='icon'/></button>
                <button className={classes.Delete} onClick={this.deleteClickedHandler}><img width='10px' src={DeleteIcon} alt='icon'/></button>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        message: state.students.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteStudent: (id) => dispatch(actions.deleteStudent(id)),
        onEditStudent: (id, data) => dispatch(actions.editStudent(id, data)),
        onFetchStudents: (page) => dispatch(actions.fetchStudents(page))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Manipulate));