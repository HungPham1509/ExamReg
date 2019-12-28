import React, {Component} from 'react';
import {connect} from 'react-redux';
import Examination from './Examination/Examination';
import AddButton from '../../components/UI/AddButton/AddButton';
import AddIcon from '../../theme/svg/add.svg'
import AddingInput from '../../components/UI/AddingInput/AddingInputs';
import Modal from '../../components/Modal/Modal';
import BackDrop from '../../components/UI/BackDrop/BackDrop';
import * as actions from '../../redux/actions/index';
import classes from './Examinations.css';

class Examinations extends Component {

    state = {
        examination: {
            year: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: 'Năm học'
            },
            semester: {
                elementType: 'input',
                config: {
                    type: 'number'
                },
                value: 1,
                label: 'Học kì'
            }
        },
        add: false
    }

    componentDidMount() {
        this.props.onFetchExaminations();
    }

    inputChangedHandler = (event, element) => {
        const updatedElements = {
            ...this.state.examination,
            [element]: {
                ...this.state.examination[element],
                value: event.target.value,
            }
        }
        this.setState({
            examination: updatedElements
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        const formData = {
            year: this.state.examination['year'].value,
            semester: this.state.examination['semester'].value,
        }
        this.props.onAddExamination(formData);
        this.setState({
            showModal: true,
            add: false
        })
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
        this.componentDidMount();
        this.props.history.goBack();
    }

    addExHandler = () => {
        this.setState({
            add: true
        })
        const path = this.props.location.pathname;
        this.props.history.push({
            pathname: path,
            search: '/add'
        })
    }

    cancelClickedHandler = () => {
        this.setState({
            add: false
        })
        this.props.history.goBack();
    }

    render() {
        let message = null;
        if(this.props.message) {
            message = this.props.message
        }
        if(this.props.error2) {
            message = this.props.error2
        }
        const addingForm = [];
        for(let element in this.state.examination) {
            addingForm.push({
                id: element,
                properties: this.state.examination[element]
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

        let bd = (this.state.add) ? <BackDrop clicked={this.cancelClickedHandler} show={this.state.add}/> : null

        const list = this.props.examinations.map(ex => {
            return <Examination key={ex.uuid} link={'/examinations/examinationID=' + ex.uuid} year={ex.year} semester={ex.semester}/>
        })

        return  <div className={classes.Examinations}>
                    <div className={classes.Title}>Dang sách kì thi</div>
                    <ul className={classes.List}>
                        {list}
                    </ul>
                    {addForm}
                    {bd}
                    <Modal show={this.state.showModal} clicked={this.closeModalHandler}>{message}</Modal>
                    <AddButton classButton='AddButton' icon={AddIcon} clicked={this.addExHandler}>Thêm kì thi</AddButton>
                </div>
    }
}


const mapStateToProps = (state) => {
    return {
        examinations: state.examinations.examinations,
        error: state.students.error,
        message: state.examinations.message,
        error2: state.examinations.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchExaminations: () => dispatch(actions.fetchExaminations()),
        onAddExamination: (data) => dispatch(actions.addExamination(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examinations);