import React, {Component} from 'react';
import User from '../../components/User/User';
import AddingInput from '../../components/UI/AddingInput/AddingInputs';
import Button from '../../components/UI/Button/Button';
import cancelIcon from '../../theme/svg/cancel.svg';
import saveIcon from '../../theme/svg/save.svg';
import {connect} from 'react-redux';
import * as constants from '../../constants/string';
import * as actions from '../../redux/actions/index';

import classes from './AddAccount.css';

class AddAccount extends Component {
    state = {
        elements: {
            name: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: constants.LECTURER_NAME,
                validation: {
                    required: true,
                    noWhiteSpace: true
                },
                touched: false,
                valid: false
            },
            role: {
                elementType: 'select',
                options: {
                    student: {
                        value: 'Sinh viên'
                    },
                    lecturer: {
                        value: 'Giảng viên'
                    },
                    partner: {
                        value: 'Đối tác'
                    }
                },
                value: 'Sinh viên',
                label: constants.ROLE,
                validation: {
                    required: true,
                    noWhiteSpace: true
                },
                touched: false,
                valid: false
            },
            email: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: constants.VNU_MAIL,
                validation: {
                    required: true,
                    noWhiteSpace: true
                },
                touched: false,
                valid: false
            },
            phoneNumber: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: constants.PHONE_NUMBER,
                validation: {
                    required: true,
                    noWhiteSpace: true
                },
                valid: false,
                touched: false
            },
            note: {
                elementType: 'input',
                config: {
                    type: 'text'
                },
                value: '',
                label: constants.NOTE,
                validation: {
                    required: true,
                    noWhiteSpace: true
                },
                touched: false,
                valid: false
            },
            password: {
                elementType: 'input',
                config: {
                    type: 'password'
                },
                value: '',
                label: constants.PASSWORD_LABEL,
                icon: 'password',
                validation: {
                    required: true,
                    noWhiteSpace: true 
                },
                valid: false,
                touched: false
            },
            reEnterPassword: {
                elementType: 'input',
                config: {
                    type: 'password'
                },
                value: '',
                label: constants.REENTER_PASSWORD,
                icon: 'password',
                validation: {
                    required: true,
                    noWhiteSpace: true,
                    sameAsPassword: true
                },
                valid: false,
                touched: false
            }
        }
    }

    inputChangedHandler = (event, element) => {
        const updatedElements = {
            ...this.state.elements,
            [element]: {
                ...this.state.elements[element],
                value: event.target.value,
                valid: this.checkInputValidation(event.target.value, this.state.elements[element].validation),
                touched: true
            }
        }
        this.setState({
            elements: updatedElements
        })
    }

    checkInputValidation = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = (value.trim() !== '' && isValid)
        }
        if(rules.noWhiteSpace) {
            isValid = (value.indexOf(' ') !== 0 && value.lastIndexOf(' ') !== value.length-1 && isValid)
        }
        if(rules.sameAsPassword) {
            isValid = (value === this.state.elements['password'].value && isValid)
        }
        return isValid;
    }

    cancelClickedHandler = () => {
        const temp = {
            ...this.state.elements
        }
        for(let element in temp) {
            temp[element].value = '';
            temp[element].touched = false;
        }
        this.setState({
            elements: temp
        })
    }

    saveClickedHandler = () => {
        const dataForm = {
            fullname: this.state.elements['name'].value,
            role: this.state.elements['role'].value,
            email: this.state.elements['email'].value,
            phoneNumber: this.state.elements['phoneNumber'].value,
            note: this.state.elements['note'].value,
            password: this.state.elements['password'].value
        }
        let tempValid = true;
        const temp = {
            ...this.state.elements
        }
        for(let element in temp) {
            if(temp[element].valid === false) {
                tempValid = false;
                break;
            }
        }
        if(tempValid) {
            this.props.onAddAccount(dataForm);
        }
    }

    render() {
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
                        options={element.properties.options}
                        label={element.properties.label}
                        value={element.properties.value}
                        valid={element.properties.valid}
                        touched={element.properties.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)}/>
        })
        let mess = null;
        if(this.props.message) {
            mess = <div className={classes.Mess} style={{color: 'green', textAlign: 'center'}}>{this.props.message}</div>
        }
        if(this.props.error) {
            mess = <div className={classes.Mess} style={{color: 'red', textAlign: 'center'}}>{this.props.error}</div>
        }

        return  <div className={classes.AddAccount}>
                    <User />
                    <div className={classes.AddAccountContainer}>
                    {mess}
                        <p>{constants.ADD_ACCOUNT}</p>
                        <form className={classes.addAccountForm}>
                            {form}
                        </form>
                        <div className={classes.Button}>
                                <Button buttonType='Cancel' clicked={this.cancelClickedHandler}>
                                    <img src={cancelIcon} alt='icon' />
                                    {constants.CANCEL}
                                </Button>
                                <Button buttonType='Save' clicked={this.saveClickedHandler}>
                                    {constants.SAVE}
                                    <img src={saveIcon} alt='icon' />
                                </Button>
                        </div>
                    </div>
                </div>
    }
}

const mapStateToProps = state => {
    return {
        error: state.accounts.error,
        message: state.accounts.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddAccount: (dataForm) => dispatch(actions.addAccount(dataForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount);