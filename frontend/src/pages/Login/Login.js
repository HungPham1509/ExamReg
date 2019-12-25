import React, {Component} from 'react';
import Logo from './Logo/Logo';
import Input from '../../components/UI/Input/Input';
//import ProgressBar from '../../components/ProgressBar/ProgressBar';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import logInIcon from '../../theme/svg/login-square-arrow-button-outline.svg';
import * as actions from '../../redux/actions/index';
import * as constants from '../../constants/string';
import classes from './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: {
                username: {
                    elementType: 'input',
                    config: {
                        type: 'text'
                    },
                    value: '',
                    placeholder: constants.USERNAME_LABEL,
                    icon: 'user',
                    validation: {
                        required: true,
                        noWhiteSpace: true
                    },
                    valid: false
                },
                password: {
                    elementType: 'input',
                    config: {
                        type: 'password'
                    },
                    value: '',
                    placeholder: constants.PASSWORD_LABEL,
                    icon: 'password',
                    validation: {
                        required: true,
                        noWhiteSpace: true 
                    },
                    valid: false
                }
            },
            errorMessage: null
        }
    }

    checkInputValidation = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = (value.trim() !== '' && isValid)
        }
        if(rules.noWhiteSpace) {
            isValid = (!value.includes(' ') && isValid)
        }
        return isValid;
    }

    inputChangedHandler = (event, element) => {
        const updatedElements = {
            ...this.state.elements,
            [element]: {
                ...this.state.elements[element],
                value: event.target.value,
                valid: this.checkInputValidation(event.target.value, this.state.elements[element].validation)
            }
        }
        this.setState({
            elements: updatedElements,
            errorMessage: null
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        const usernameValid = this.state.elements["username"].valid;
        const passwordValid = this.state.elements["password"].valid;
        if(usernameValid && passwordValid) {
            this.props.onAuth(this.state.elements["username"].value, this.state.elements["password"].value);
        }
        else {
            const em = constants.ERRORMESSAGE;
            this.setState({
                errorMessage: em
            })
        }
    }

    render() {
        let loginRedirect;
        if(this.props.isAuthenticated) {
            if(this.props.role == 0) {
                loginRedirect = <Redirect to='/students' />
            }
            else {
                loginRedirect = <Redirect to='/profile' />
            }
        }
        let message = null;
        if(this.props.error) {
            message = <div className={classes.mess}>
                             <i className="warning circle icon" style={{color: 'white'}}/>
                             <h4>{this.props.error}</h4>
                      </div>
        }
        const loginFormElement = [];
        for(let element in this.state.elements) {
            loginFormElement.push({
                id: element,
                properties: this.state.elements[element]
            });
        }

        let form = loginFormElement.map(element => {
            return <Input 
                        key={element.id}
                        type={element.properties.elementType}
                        config={element.properties.config}
                        value={element.properties.value}
                        placeholder={element.properties.placeholder}
                        containIconImage={element.properties.icon}
                        class={classes.InputElement}
                        valid={element.properties.valid}
                        errorMessage={this.state.errorMessage}
                        changed={(event) => this.inputChangedHandler(event, element.id)}/>
        })
    
        return (
            <div className={classes.LoginContainer}>
                {loginRedirect}
                <Logo />
                <div className={classes.Frame}>
                    <form onSubmit={this.submitFormHandler}>
                        {message}
                        {form}
                        <button className={classes.ButtonElement}>
                            <label>{constants.LOGIN_LABEL}</label>
                            <img src={logInIcon} alt='icon'/>
                        </button>
                    </form>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        role: state.auth.role,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);