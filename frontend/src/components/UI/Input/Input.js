import React from 'react';
import userIcon from '../../../theme/svg/specialist-user.svg';
import passwordIcon from '../../../theme/svg/key.svg';
import classes from './Input.css';


const input = (props) => {
    let inputElement = null;
    switch(props.type) {
        case('input'):
            inputElement = <input 
                                {...props.config}
                                placeholder={props.placeholder} 
                                value={props.value} 
                                onChange={props.changed}/>   
            break;
        
        default:
            inputElement = <input 
                                {...props.config}
                                placeholder={props.placeholder}  
                                value={props.value} 
                                onChange={props.changed}/>
    }

    let iconImage = null;
    switch(props.containIconImage) {
        case('user'):
            iconImage = <div className={classes.Icon}><div className={classes.container}><img src={userIcon} alt='icon'/></div></div>
            break;
        case('password'):
            iconImage = <div className={classes.Icon}><div className={classes.container}><img src={passwordIcon} alt='icon' /></div></div>
            break;
        default:
            iconImage = null
    }

    let errorMess = null;
    let errorStyle = null;
    if(!props.valid && props.errorMessage) {
        errorMess = <p className={classes.Mess}>{props.errorMessage}</p>;
        errorStyle = {border: '1px solid #ec5956', borderRadius: '3px'}
    }
     
    return (
        <div className={props.class} style={errorStyle}>
            {iconImage}
            {inputElement}
            {errorMess}
        </div>
    )
}

export default input;