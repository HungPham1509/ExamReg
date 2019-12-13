import React from 'react';

import classes from './Block.css';

const block = (props) => {
    const blockClasses = [classes.Block, props.blockClass].join(' ');
    let tt = (props.label === 'VNU mail') ? {textTransform: 'lowercase'} : null
    return (
        <div className={classes.Container}>
            <label>{props.label}</label>
            <div className={blockClasses} style={tt}>{props.child}</div>
        </div>
    )
}

export default block;