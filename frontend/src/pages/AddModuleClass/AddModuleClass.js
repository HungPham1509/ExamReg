import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import UploadIcon from '../../theme/svg/cloud-computing.svg';
import WarningIcon from '../../theme/svg/problem.svg';
import Example from '../../theme/images/s1.png';
import Modal from '../../components/Modal/Modal';
import * as actions from '../../redux/actions/index';
import classes from './AddModuleClass.css';

class AddModuleClass extends Component {
    state = {
        file: null,
        showModal: false
    }

    inputChangeHandler = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAddModuleClass(this.state.file);
        this.setState({
            showModal: true
        })
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
    }

    render() {
        let message = null;
        if(this.props.message) {
            message = <div>{this.props.message}</div>
        }

        if(this.props.error) {
            message = <div>{this.props.error}</div>
        }

        return (
            <div className={classes.AddModuleClass}>
                <Modal show={this.state.showModal} clicked={this.closeModalHandler}>{message}</Modal>
                <form className={classes.Form} onSubmit={this.submitHandler}>
                    <div className={classes.Title}>Thêm Lớp học phần</div>
                    <div className={classes.Box}>
                        <input className={classes.InputFile} type='file' onChange={this.inputChangeHandler} />
                        <Button buttonType='Upload' type='submit'>
                            <img src={UploadIcon} alt='icon' />
                        </Button>
                    </div>
                    <div className={classes.Cautious}>
                        <div className={classes.Note}>
                            <img src={WarningIcon} alt='icon' />
                            <div>Lưu ý: File upload là file excel và đuôi file phải có dạng <strong>.xlsx</strong></div>
                        </div>
                        <div className={classes.Note}>Format của file excel như sau:</div>
                        <div className={classes.Examples}>
                            <img src={Example} alt='image1'></img>
                        </div>
                    </div>
                </form>
            </div>
        )  
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.courses.message,
        error: state.courses.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddModuleClass: (file) => dispatch(actions.addModuleClass(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModuleClass);