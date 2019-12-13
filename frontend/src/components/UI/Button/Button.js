import React from 'react';
import classes from './Button.css';


const button = (props) => {
    return <button type={props.type} className={[classes.Button, classes[props.buttonType]].join(' ')}
                    onClick={props.clicked}>
                    {props.children}
            </button>
}

export default button;