import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageButton from '../../components/UI/PageButton/PageButton';
import Manipulate from '../../components/Manipulate/Manipulate';
import BackDrop from '../../components/UI/BackDrop/BackDrop';
import Modal from '../../components/Modal/Modal';
import AddButton from '../../components/UI/AddButton/AddButton';
import * as actions from '../../redux/actions/index';
import classes from './Students.css';

class Students extends Component {
    state = {
        page: 0,
        showNext: true,
        showPrevious: false,
        add: false,
        showModal: false
    }

    componentDidMount() {
        this.props.history.push({
            pathname: '/students',
            search: '?page=' + (this.state.page + 1)
        })
        this.props.onFetchStudents(this.state.page)
    }

    nextClickedHandler = () => {
        const tmp = this.state.page + 1;
        if(this.props.students.length >= 10) {
            this.props.history.push({
                pathname: '/students',
                search: '?page=' + (tmp + 1)
            })
            this.props.onFetchStudents(tmp)
            this.setState({
                page: tmp,
                showNext: true,
                showPrevious: true
            })
        }
        else {
            this.setState({
                showNext: false
            })
        }
    }

    previousClickedHandler = () => {
        const tmp = this.state.page - 1;
        if(this.state.page > 0) {
            this.props.history.push({
                pathname: '/students',
                search: '?page=' + (tmp + 1)
            })
            this.props.onFetchStudents(tmp)
            this.setState({
                page: tmp,
                showPrevious: true,
                showNext: true
            })
        }
        else {
            this.setState({
                showPrevious: false
            })
        }
    }

    addStudentAccountClickedHandler = (event) => {
        this.props.history.push({
            pathname: '/students',
            search: '?page=' + (this.state.page + 1) + '/add-student-account'
        })
        this.setState({
            add: true
        })
    }

    cancelClickedHandler = () => {
        this.setState({
            add: false
        })
        this.props.history.goBack();
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onAddStudentAccount();
        this.setState({
            showModal: true,
            add: false
        })
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
        this.props.onFetchStudents(this.state.page);
        this.props.history.goBack()
    }

    render() {
        let addAcountConfirm = null;
        if(this.state.add) {
            addAcountConfirm = (
                <div className={classes.formContainer}>
                    <div className={classes.AddTitle}>Cấp tài khoản cho sinh viên</div>
                    <form className={classes.Form} onSubmit={this.submitFormHandler}>
                        <div className={classes.Ques}>Cấp tài khoản cho những sinh viên chưa có tài khoản ?</div>
                        <div className={classes.Buttons}>
                            <button className={classes.Cancel} onClick={this.cancelClickedHandler}>Hủy bỏ</button>
                            <button className={classes.Save} type='submit'>Xác nhận</button>
                        </div>  
                    </form>
                </div>
            )
        }

        let bd = (this.state.add) ? <BackDrop clicked={this.cancelClickedHandler} show={this.state.add}/> : null

        const sList = this.props.students.map(student => {
            const editForm = {
                fullname: student.fullname,
                student_code: student.student_code,
                birth_date: student.birth_date,
                class_name: student.class_name,
                class_code: student.class_code,
                vnu_mail: student.vnu_mail
            }
            return(
                <tr key={student.uuid}>
                    <td>{student.fullname}</td>
                    <td>{student.student_code}</td>
                    <td>{student.birth_date}</td>
                    <td>{student.class_name}</td>
                    <td><Manipulate id={student.uuid} page={this.state.page} formData={editForm}/></td>
                </tr>
            )
        })
        
        return  <div className={classes.Container}>
                    <div className={classes.StudentList}>
                        <div className={classes.Title}>Dang sách sinh viên</div>
                        <table className={classes.Table}>
                            <thead>
                                <tr>
                                    <th>Họ và tên</th>
                                    <th style={{width: '150px'}}>Mã sinh viên</th>
                                    <th>Ngày sinh</th>
                                    <th>Lớp</th>
                                    <th style={{textAlign: 'center', width: '150px'}}>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sList}
                            </tbody>
                        </table>
                        <div className={classes.ButtonsRow}>
                            <PageButton 
                            nextClicked={this.nextClickedHandler} 
                            previousClicked={this.previousClickedHandler}
                            showPrevious={this.state.showPrevious}
                            showNext={this.state.showNext}
                            page={this.state.page + 1}
                            style={classes.PButton}/>
                            <AddButton clicked={this.addStudentAccountClickedHandler} classButton='AddAccount'>Cấp tài khoản cho sinh viên</AddButton>
                        </div>
                    </div>
                    {addAcountConfirm}
                    {bd}
                    <Modal show={this.state.showModal} clicked={this.closeModalHandler}>{this.props.message}</Modal>
                </div>
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students.students,
        error: state.students.error,
        message: state.students.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchStudents: (page) => dispatch(actions.fetchStudents(page)),
        onAddStudentAccount: () => dispatch(actions.addStudentAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);