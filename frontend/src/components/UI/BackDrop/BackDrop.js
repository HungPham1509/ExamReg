import React from 'react';
import classes from './BackDrop.css';

const backdrop = (props) => {
    return (props.show) ? <div className={classes.BackDrop} onClick={props.clicked}></div> : null
}

export default backdrop;