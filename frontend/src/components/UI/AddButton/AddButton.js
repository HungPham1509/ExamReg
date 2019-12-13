import React from 'react';
import classes from './AddButton.css';


const addButton = (props) => {
    let ic = (props.icon) ? <img src={props.icon} alt='icon'/> : null
    return <button className={classes[props.classButton]} onClick={props.clicked}>
                    {ic}
                    {props.children}
            </button>
}

export default addButton;