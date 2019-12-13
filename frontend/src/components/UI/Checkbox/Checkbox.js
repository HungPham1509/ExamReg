import React from 'react'
import classes from './Checkbox.css'


const checkbox = (props) => {
    return  <label className={classes.container}>{props.label}
                <input type='checkbox' onClick={props.clicked}/>
                <span className={classes.checkmark}></span>
            </label>
}

export default checkbox;