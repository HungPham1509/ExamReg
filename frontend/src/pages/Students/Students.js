import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageButton from '../../components/UI/PageButton/PageButton';
import Manipulate from '../../components/Manipulate/Manipulate';
import AddButton from '../../components/UI/AddButton/AddButton';
import * as actions from '../../redux/actions/index';
import classes from './Students.css';

class Students extends Component {
    state = {
        page: 0,
        showNext: true,
        showPrevious: false
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
            pathname: '/students/add-student-accounts'
        })
        this.props.onAddStudentAccount();
    }

    render() {
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
                </div>
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students.students,
        error: state.students.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchStudents: (page) => dispatch(actions.fetchStudents(page)),
        onAddStudentAccount: () => dispatch(actions.addStudentAccount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);