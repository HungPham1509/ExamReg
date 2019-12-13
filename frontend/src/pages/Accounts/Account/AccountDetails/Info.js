import React from 'react';

import classes from './Info.css';


const info = (props) => {
    if(props.elementType === 'input') {
        return (
            <div className={classes.InfoTypeText}>
                <p>{props.label}</p>
                <p>{props.value}</p>
            </div>
        )
    }
    else if(props.elementType === 'select') {
        return (
            <div className={classes.InfoTypeSelect}>
                <p>{props.label}</p>
                <select disabled>
                    <option>{props.value}</option>
                </select>
            </div>
        )
    }
    else if(props.elementType === 'textarea') {
        return (
            <div className={classes.InfoTypeTextarea}>
                <p>{props.label}</p>
                <textarea value={props.value} readOnly></textarea>
            </div>
        )
    }
    return null;
}

export default info;