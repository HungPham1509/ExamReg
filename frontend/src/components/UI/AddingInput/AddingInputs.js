import React from 'react';
import classes from './AddingInput.css';


const input = (props) => {
    let opts = null;
    if(props.config.options && props.config.options.length > 0) {
        opts = props.config.options.map(opt => {
            return <option value={opt.uuid} key={opt.uuid}>{opt.course_name}</option>
        })
    }

    let inputElement = null;
    switch(props.type) {
        case('input'):
            inputElement = <input type={props.config['type']}
                                className={classes.Block}
                                value={props.value} 
                                onChange={props.changed}/>   
            break;
        case('select'):
            inputElement =  <select value={props.value} onChange={props.changed}>
                                <option value=''></option>
                                {opts}
                            </select>
            break;
        default:
            inputElement = <input type={props.config['type']}
                                    className={classes.Block}   
                                    value={props.value} 
                                    onChange={props.changed}/> 
    }
    

    return (
            <div className={classes.Container}>
                <label>{props.label}</label>
                    {inputElement}
            </div>
    )
}

export default input;