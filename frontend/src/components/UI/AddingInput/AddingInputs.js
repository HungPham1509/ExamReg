import React from 'react';
import classes from './AddingInput.css';


const input = (props) => {
    let style = (props.touched && !props.valid) ? {borderColor: 'red'} : null;
    let mess = (props.touched && !props.valid) ? <p className={classes.Invalid}>Thông tin không hợp lệ</p> : null;
    let opts = null;
    let temp = [];
    if(props.options) {
        for(let option in props.options) {
            temp.push({
                id: option,
                prop: props.options[option]
            });
        }
        opts = temp.map(opt => {
            return <option value={opt.prop.value} key={opt.id}>{opt.prop.value}</option>
        })
    }


    let inputElement = null;
    switch(props.type) {
        case('input'):
            inputElement = <input 
                                {...props.config}
                                value={props.value} 
                                onChange={props.changed}
                                style={style}/>   
            break;
        case('select'):
            inputElement =  <select value={props.value} onChange={props.changed}>
                                {opts}
                            </select>
            break;
        default:
            inputElement = <input 
                                {...props.config}
                                value={props.value} 
                                onChange={props.changed}/>
    }
    

    return (
            <span className={classes.InputContainer}>
                <label>{props.label}</label>
                    {inputElement}
                    {mess}
            </span>
    )
}

export default input;