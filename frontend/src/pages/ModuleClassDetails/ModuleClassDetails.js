import React, {Component} from 'react';
import {connect} from 'react-redux';
import Block from '../../components/Block/Block';
import PageButton from '../../components/UI/PageButton/PageButton';
import * as actions from '../../redux/actions/index';
import classes from './ModuleClassDetails.css';

class ModuleClassDetails extends Component {
    state = {
        upperBoundary: 8,
        lowerBoundary: 0,
        showNextButton: true,
        showPreviousButton: false
    }

    componentDidMount() {
        const id = this.props.match.params.module_class_uuid;
        this.props.onFecthModuleClass(id);
    }

    nextPageClickHandler = () => {
        const tmp = this.state.upperBoundary + 8;
        const tmp2 = this.state.lowerBoundary + 8;
        const list = this.props.moduleClass['students'];
        if(tmp <= list.length + 8) {
            this.setState({
                upperBoundary: tmp,
                lowerBoundary: tmp2,
                showNextButton: true,
                showPreviousButton: true
            })
        }
        if(this.state.upperBoundary > list.length - 8)  {
            this.setState({
                showNextButton: false
            })
        }
    }

    previousPageClickHandler = () => {
        const tmp = this.state.upperBoundary - 8;
        const tmp2 = this.state.lowerBoundary -8;
        if(tmp2 >= 0) {
            this.setState({
                upperBoundary: tmp,
                lowerBoundary: tmp2,
                showPreviousButton: true,
                showNextButton: true
            })
        }
        if(this.state.lowerBoundary <= 8) {
            this.setState({
                showPreviousButton: false
            })
        }
    }

    render() {
        const details = [];
        let studentList;
        let i = 0;
        const labels = ['Lớp học phần:', 'Số tín chỉ:', 'Giảng viên:'];
        for(let detail in this.props.moduleClass) {
            if(detail !== 'uuid' && detail !== 'students' && detail !== 'courseUuid') {
                details.push({
                    id: detail,
                    properties: this.props.moduleClass[detail],
                    label: labels[i]
                })
                i++; 
            }
            
            if(detail === 'students') {
                studentList = this.props.moduleClass[detail];
            }
        }
        
        const allDetails = details.map(detail => {
            return <Block key={detail.id} child={detail.properties} label={detail.label}/>
        });

        const sList = studentList.map(student => {
            const index = studentList.indexOf(student);
            const stt = index + 1;
            if(index >= this.state.lowerBoundary && index < this.state.upperBoundary && index >= 0 && index < studentList.length) {
               let note = (student.condition['status'] === 0) ? 'Cấm thi' : 'Đủ điều kiện thi';
                return (
                    <tr key={student.uuid}>
                        <td>{stt}</td>
                        <td>{student.fullname}</td>
                        <td>{student.student_code}</td>
                        <td>{student.birth_date}</td>
                        <td>{student.class_name}</td>
                        <td>{student.class_code}</td>
                        <td>{note}</td>
                    </tr>
                ) 
            }
            else {
                return null;
            }
        })

        return(
            <div className={classes.Container}>
                <div className={classes.Information}>
                    {allDetails}
                </div>
                <div className={classes.StudentList}>
                    <div className={classes.Title}>Dang sách sinh viên</div>
                    <table className={classes.Table}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ và tên</th>
                                <th>Mã sinh viên</th>
                                <th>Ngày sinh</th>
                                <th>Lớp</th>
                                <th>Khóa</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sList}
                        </tbody>
                    </table>
                    <div className={classes.PageButtonContainer}>
                        <PageButton 
                            nextClicked={this.nextPageClickHandler} 
                            previousClicked={this.previousPageClickHandler} 
                            showNext={this.state.showNextButton} 
                            showPrevious={this.state.showPreviousButton}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        moduleClass: state.courses.moduleClassDetails,
        error: state.courses.error
    }
}

const mapDispatchTopProps = (dispatch) => {
    return {
        onFecthModuleClass: (moduleClassUuid) => dispatch(actions.fetchModuleClassDetails(moduleClassUuid))
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(ModuleClassDetails);